import "./index.css";
import { useMemo, useState } from "react";

import AnimatedBackground from "./components/AnimatedBackground";

import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import Licensing from "./components/sections/Licensing";
import HowToUse from "./components/sections/HowToUse";
import Contact from "./components/sections/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

import SearchSection from "./components/search/SearchSection";

import FeaturedTracks from "./components/music/FeaturedTracks";
import TrackDetailView from "./components/music/TrackDetailView";

import Pricing from "./components/pricing/Pricing";
import LicenseModal from "./components/licensing/LicenseModal";
import CartDrawer from "./components/cart/CartDrawer";

import tracks from "./data/tracks";
import currencies from "./data/currencies";

import { createOrder } from "./services/orderService";
import { startPayment } from "./services/payment/paymentOperations";

import { PlayerProvider } from "./context/PlayerContext.jsx";

function App() {
  const [activeView, setActiveView] = useState("home");

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  const [modalTrack, setModalTrack] = useState(null);
  const [isLicenseModalOpen, setIsLicenseModalOpen] =
    useState(false);

  const [selectedTrack, setSelectedTrack] =
    useState(null);

  const [isTrackDetailOpen, setIsTrackDetailOpen] =
    useState(false);

  const [selectedCurrencyCode, setSelectedCurrencyCode] =
    useState(() => {
      const savedCurrency =
        window.localStorage.getItem(
          "damtaro-currency"
        );

      return currencies.some(
        (currency) =>
          currency.code === savedCurrency
      )
        ? savedCurrency
        : "USD";
    });

  const [cartItems, setCartItems] = useState([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [lastAddedItem, setLastAddedItem] =
    useState(null);

  const [currentOrder, setCurrentOrder] =
    useState(null);

  const selectedCurrency = useMemo(() => {
    return (
      currencies.find(
        (currency) =>
          currency.code === selectedCurrencyCode
      ) || currencies[0]
    );
  }, [selectedCurrencyCode]);

  const filteredTracks = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return tracks.filter((track) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          track.title,
          track.genre,
          track.mood,
          track.bpm,
          track.duration,
        ].some((value) =>
          String(value)
            .toLowerCase()
            .includes(normalizedQuery)
        );

      const matchesFilters =
        Object.entries(filters).every(
          ([key, value]) =>
            !value ||
            String(track[key]) === value
        );

      return matchesQuery && matchesFilters;
    });
  }, [filters, query]);

  function openLicenseModal(track = null) {
    setModalTrack(track);
    setIsLicenseModalOpen(true);
  }

  function openTrackDetail(track) {
    setSelectedTrack(track);
    setIsTrackDetailOpen(true);
  }

  function handleNavigate(view) {
    setActiveView(view);

    setIsLicenseModalOpen(false);
    setIsTrackDetailOpen(false);
    setIsCartOpen(false);
    setLastAddedItem(null);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  function handleCurrencyChange(currencyCode) {
    const currencyExists = currencies.some(
      (currency) =>
        currency.code === currencyCode
    );

    if (!currencyExists) {
      return;
    }

    setSelectedCurrencyCode(currencyCode);

    window.localStorage.setItem(
      "damtaro-currency",
      currencyCode
    );
  }

  function handleAddToCart({
    license,
    track,
  }) {
    const cartItem = {
      id: `${track?.id || "catalog"}-${license.id || license.title}-${Date.now()}`,
      track,
      license,
    };

    if (license?.type === "creator") {
      const order = createOrder({
        items: [cartItem],
        currency: selectedCurrency.code,
      });

      setCurrentOrder(order);

      const payment = startPayment({ order });

      window.location.assign(payment.checkoutUrl);
      return;
    }

    setCartItems((currentItems) => [
      ...currentItems,
      cartItem,
    ]);

    setLastAddedItem(cartItem);

    setIsLicenseModalOpen(false);
    setIsTrackDetailOpen(false);

    window.setTimeout(() => {
      setIsCartOpen(true);
    }, 280);
  }

  function handleRemoveFromCart(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    );
  }

  function handleOpenCart() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  function handleContinueShopping() {
    setIsCartOpen(false);
    setLastAddedItem(null);
    handleNavigate("music");
  }

  function handleProceedToCheckout() {
    if (cartItems.length === 0) {
      return;
    }

    const order = createOrder({
      items: cartItems,
      currency: selectedCurrency.code,
    });

    setCurrentOrder(order);

    setIsCartOpen(false);
    setLastAddedItem(null);
    setActiveView("checkout");

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  function handleContactSales() {
    setIsCartOpen(false);
    setLastAddedItem(null);
    handleNavigate("contact");
  }

  function handleBackToCart() {
    setActiveView("music");
    setIsCartOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  return (
    <PlayerProvider>
      <AnimatedBackground />

      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        selectedCurrency={selectedCurrency}
        currencies={currencies}
        onCurrencyChange={handleCurrencyChange}
        onOpenCart={handleOpenCart}
        cartItemCount={cartItems.length}
      />

      <main className="min-h-screen bg-[#090909]">

        {/* Home */}
        {activeView === "home" && (
          <section className="min-h-screen">
            <Hero />
          </section>
        )}

        {/* Music */}
        {activeView === "music" && (
          <section className="min-h-screen pt-24 pb-24 sm:pt-28">
            <SearchSection
              query={query}
              onQueryChange={setQuery}
              filters={filters}
              onFiltersChange={setFilters}
            />

            <FeaturedTracks
              tracks={filteredTracks}
              onLicense={openLicenseModal}
              onViewTrack={openTrackDetail}
            />
          </section>
        )}

        {/* Licensing + Pricing */}
        {activeView === "licensing" && (
          <section className="min-h-screen pt-32 pb-24">
            <Licensing
              onLicense={() =>
                openLicenseModal()
              }
            />

            <Pricing
              onLicense={() =>
                openLicenseModal()
              }
            />
          </section>
        )}

        {/* How to Use */}
        {activeView === "how-to-use" && (
          <section className="min-h-screen pt-32 pb-24">
            <HowToUse />
          </section>
        )}

        {/* Contact */}
        {activeView === "contact" && (
          <section className="min-h-screen pt-32 pb-24">
            <Contact />
          </section>
        )}

        {/* Login */}
        {activeView === "login" && (
          <Login
            onNavigate={handleNavigate}
          />
        )}

        {/* Register */}
        {activeView === "register" && (
          <Register
            onNavigate={handleNavigate}
          />
        )}

        {/* Checkout */}
        {activeView === "checkout" && (
          <Checkout
            items={cartItems}
            order={currentOrder}
            selectedCurrency={selectedCurrency}
            onBackToCart={handleBackToCart}
            onContinueShopping={() =>
              handleNavigate("music")
            }
          />
        )}

      </main>

      {/* License Modal */}
      <LicenseModal
        open={isLicenseModalOpen}
        onClose={() =>
          setIsLicenseModalOpen(false)
        }
        track={modalTrack}
        onAddToCart={handleAddToCart}
      />

      {/* Track Detail */}
      <TrackDetailView
        open={isTrackDetailOpen}
        track={selectedTrack}
        onClose={() =>
          setIsTrackDetailOpen(false)
        }
        onLicense={openLicenseModal}
        suppressEscape={isLicenseModalOpen}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onContinueShopping={handleContinueShopping}
        onProceedToCheckout={
          handleProceedToCheckout
        }
        onContactSales={handleContactSales}
        lastAddedItem={lastAddedItem}
      />
    </PlayerProvider>
  );
}

export default App;
