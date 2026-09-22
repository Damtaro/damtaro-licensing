import "./index.css";
import { useCallback, useMemo, useState } from "react";

import AnimatedBackground from "./components/AnimatedBackground";

import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import Licensing from "./components/sections/Licensing";
import HowToUse from "./components/sections/HowToUse";
import SamplePacks from "./components/sections/SamplePacks";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

import Checkout from "./pages/Checkout";
import LegalInformation from "./pages/LegalInformation";
import { legalDocuments } from "./data/legalDocuments";

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
  const [licenseTermsAccepted, setLicenseTermsAccepted] = useState(false);
  const [legalReturn, setLegalReturn] = useState(null);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  const [modalTrack, setModalTrack] = useState(null);
  const [isLicenseModalOpen, setIsLicenseModalOpen] =
    useState(false);
  const closeLicenseModal = useCallback(() => setIsLicenseModalOpen(false), []);

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
    setLicenseTermsAccepted(false);
    setLegalReturn(null);
    setModalTrack(track);
    setIsLicenseModalOpen(true);
  }

  function openTrackDetail(track) {
    setSelectedTrack(track);
    setIsTrackDetailOpen(true);
  }

  function handleNavigate(view) {
    if (!Object.hasOwn(legalDocuments, view)) setLegalReturn(null);
    setLicenseTermsAccepted(false);
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

  function handleReadLegal(view, source) {
    setLegalReturn({ source, view: activeView });
    handleNavigate(view);
  }

  function handleReturnFromLegal() {
    if (!legalReturn) return;
    const { source, view } = legalReturn;
    handleNavigate(view);
    if (source === "license") setIsLicenseModalOpen(true);
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
    if (!licenseTermsAccepted) return;
    const cartItem = {
      id: `${track?.id || "catalog"}-${license.id || license.title}-${Date.now()}`,
      track,
      license,
    };

    if (license?.type === "creator" || license?.type === "business") {
      const order = createOrder({
        items: [cartItem],
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
        {Object.hasOwn(legalDocuments, activeView) && (
          <LegalInformation
            key={activeView}
            document={legalDocuments[activeView]}
            onNavigate={handleNavigate}
            onReturn={legalReturn ? handleReturnFromLegal : undefined}
            returnLabel={legalReturn?.source === "license" ? "Back to license selection" : "Back to checkout"}
          />
        )}

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
              selectedCurrency={selectedCurrency}
              onLicense={() =>
                openLicenseModal()
              }
            />

            <Pricing
              selectedCurrency={selectedCurrency}
              onLicense={() =>
                openLicenseModal()
              }
            />
          </section>
        )}

        {/* How to Use */}
        {activeView === "how-to-use" && (
          <section className="min-h-screen">
            <HowToUse onNavigate={handleNavigate} />
          </section>
        )}

        {activeView === "sample-packs" && (
          <SamplePacks onNavigate={handleNavigate} />
        )}

        {/* Contact */}
        {activeView === "contact" && (
          <section className="min-h-screen">
            <Contact />
          </section>
        )}

        {/* Checkout */}
        {(activeView === "checkout" || legalReturn?.source === "checkout") && (
          <div hidden={activeView !== "checkout"}>
          <Checkout
            onReadLegal={(view) => handleReadLegal(view, "checkout")}
            selectedCurrency={selectedCurrency}
            items={cartItems}
            order={currentOrder}
            onContactSales={handleContactSales}
            onBackToCart={handleBackToCart}
            onContinueShopping={() =>
              handleNavigate("music")
            }
          />
          </div>
        )}

      </main>

      <Footer onNavigate={handleNavigate} />

      {/* License Modal */}
      <LicenseModal
        termsAccepted={licenseTermsAccepted}
        onAcceptanceChange={setLicenseTermsAccepted}
        onReadLegal={(view) => handleReadLegal(view, "license")}
        selectedCurrency={selectedCurrency}
        open={isLicenseModalOpen}
        onClose={closeLicenseModal}
        track={modalTrack}
        onAddToCart={handleAddToCart}
        onNavigate={handleNavigate}
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
        selectedCurrency={selectedCurrency}
        open={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onContinueShopping={handleContinueShopping}
        onProceedToCheckout={
          handleProceedToCheckout
        }
        lastAddedItem={lastAddedItem}
      />
    </PlayerProvider>
  );
}

export default App;
