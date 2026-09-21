import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import Container from "../ui/Container";
import logo from "../../assets/dmlogo.png";

export default function Navbar({
  activeView = "home",
  onNavigate = () => {},
  selectedCurrency = {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    region: "United States",
    flag: "🇺🇸",
  },
  currencies = [],
  onCurrencyChange = () => {},
  onOpenCart = () => {},
  cartItemCount = 0,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const dialog = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const wideScreen = window.matchMedia("(min-width: 1280px)");
    const closeOnResize = () => { if (wideScreen.matches) setIsMenuOpen(false); };
    wideScreen.addEventListener("change", closeOnResize);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      wideScreen.removeEventListener("change", closeOnResize);
    };
  }, [isMenuOpen]);

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
      const currentScrollY = window.scrollY;

      if (activeView === "home" && currentScrollY <= 40) {
        setIsVisible(true);
        setIsScrolled(false);

        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    updateNavbar();

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeView]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest("[data-currency-selector]")) {
        setIsCurrencyOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function handleNavigation(view) {
    setIsCurrencyOpen(false);
    setIsMenuOpen(false);
    onNavigate(view);
  }

  function handleCurrencySelection(currencyCode) {
    onCurrencyChange(currencyCode);
    setIsCurrencyOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
        isVisible || isMenuOpen ? "translate-y-0" : "max-xl:translate-y-0 xl:-translate-y-full"
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          isScrolled || activeView !== "home"
            ? "border-b border-white/10 bg-[#090909]/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div
            className={`relative flex items-center transition-all duration-500 ${
              isScrolled || activeView !== "home"
                ? "min-h-20 justify-between py-3"
                : "min-h-20 justify-between py-3 xl:min-h-40 xl:justify-center xl:py-5"
            }`}
          >
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavigation("home")}
              aria-label="DAMTARO Home"
              className={`transition-all duration-500 ${
                isScrolled || activeView !== "home"
                  ? "relative z-10 shrink-0"
                  : "relative shrink-0 xl:absolute xl:left-1/2 xl:top-5 xl:-translate-x-1/2"
              }`}
            >
              <img
                src={logo}
                alt="DAMTARO"
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled || activeView !== "home"
                    ? "h-10"
                    : "h-10 xl:h-20"
                }`}
              />
            </button>

            <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#090909]/80 text-white xl:hidden">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            {/* Main Navigation */}
            <nav
              className={`hidden items-center font-sans text-sm font-bold text-white transition-all duration-500 xl:flex ${
                isScrolled || activeView !== "home"
                  ? "mx-auto gap-8"
                  : "mt-24 gap-9"
              }`}
            >
              <button
                type="button"
                onClick={() => handleNavigation("home")}
                className={`transition-colors duration-200 ${
                  activeView === "home"
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("music")}
                className={`transition-colors duration-200 ${
                  activeView === "music"
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }`}
              >
                Music
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavigation("how-to-use")
                }
                className={`transition-colors duration-200 ${
                  activeView === "how-to-use"
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }`}
              >
                How to Use
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavigation("contact")
                }
                className={`transition-colors duration-200 ${
                  activeView === "contact"
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Utility Controls */}
            <div
              className={`hidden items-center font-sans text-xs font-bold text-white transition-all duration-500 xl:flex ${
                isScrolled || activeView !== "home"
                  ? "relative z-10 shrink-0 gap-4"
                  : "absolute right-0 top-7 z-10 gap-5"
              }`}
            >
              {/* Currency Selector */}
              <div
                className="relative"
                data-currency-selector
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsCurrencyOpen((open) => !open)
                  }
                  className="flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-orange-400"
                  aria-expanded={isCurrencyOpen}
                  aria-haspopup="listbox"
                  aria-label="Select currency"
                >
                  <span>{selectedCurrency.region}</span>

                  <span className="text-white/50">
                    |
                  </span>

                  <span>
                    {selectedCurrency.code}{" "}
                    {selectedCurrency.symbol}
                  </span>

                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isCurrencyOpen
                        ? "rotate-180"
                        : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isCurrencyOpen && (
                  <div
                    className="absolute right-0 top-full mt-4 w-64 border border-white/10 bg-[#111111] p-2 shadow-2xl"
                    role="listbox"
                    aria-label="Available currencies"
                  >
                    <div className="px-3 py-2">
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                        Select Currency
                      </p>
                    </div>

                    {currencies.map((currency) => {
                      const isSelected =
                        currency.code ===
                        selectedCurrency.code;

                      return (
                        <button
                          key={currency.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() =>
                            handleCurrencySelection(
                              currency.code
                            )
                          }
                          className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors duration-200 ${
                            isSelected
                              ? "bg-orange-500/10 text-orange-400"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="text-base">
                            {currency.flag}
                          </span>

                          <span className="flex-1">
                            <span className="block font-sans text-sm font-bold">
                              {currency.code}{" "}
                              {currency.symbol}
                            </span>

                            <span className="mt-0.5 block font-sans text-[11px] text-white/40">
                              {currency.name}
                            </span>
                          </span>

                          {isSelected && (
                            <span className="text-orange-500">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Account */}
              <button
                type="button"
                onClick={() =>
                  handleNavigation("login")
                }
                className={`text-white transition-colors duration-200 hover:text-orange-400 ${
                  activeView === "login" ||
                  activeView === "register"
                    ? "text-orange-400"
                    : ""
                }`}
                aria-label="Account"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M5 20C5.8 16.8 8.3 15 12 15C15.7 15 18.2 16.8 19 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Licensing Cart */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative text-white transition-colors duration-200 hover:text-orange-400"
                aria-label={`Licensing cart${
                  cartItemCount > 0
                    ? `, ${cartItemCount} items`
                    : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M5 8.5H19L18 20H6L5 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 9V6.5C9 4.8 10.3 3.5 12 3.5C13.7 3.5 15 4.8 15 6.5V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 font-sans text-[9px] font-bold leading-none text-black">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>
      {isMenuOpen && createPortal(
        <dialog ref={menuRef} id="mobile-navigation" aria-labelledby="mobile-navigation-title"
          onCancel={() => setIsMenuOpen(false)}
          onClick={(event) => { if (event.target === event.currentTarget) setIsMenuOpen(false); }}
          className="mobile-navigation fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white">
          <div className="ml-auto flex h-full w-[min(100%,24rem)] flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-[#111111] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 id="mobile-navigation-title" className="font-display text-xl">DAMTARO</h2>
              <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close navigation menu" className="h-11 w-11 shrink-0 rounded-xl border border-white/20 text-2xl">&times;</button>
            </div>
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {[["home", "Home"], ["music", "Music"], ["how-to-use", "How to Use"], ["contact", "Contact"], ["login", "Account"]].map(([view, label]) => (
                <button key={view} type="button" onClick={() => handleNavigation(view)} aria-current={activeView === view ? "page" : undefined} className={"min-h-12 rounded-xl px-4 py-3 text-left font-bold hover:bg-white/5 " + (activeView === view ? "bg-orange-500/10 text-orange-400" : "text-white")}>{label}</button>
              ))}
              <button type="button" onClick={() => { setIsMenuOpen(false); onOpenCart(); }} className="min-h-12 rounded-xl px-4 py-3 text-left font-bold hover:bg-white/5">Licensing cart ({cartItemCount})</button>
            </nav>
            <label htmlFor="mobile-currency" className="mb-3 mt-8 text-sm font-bold text-white/60">Select Currency</label>
            <select id="mobile-currency" value={selectedCurrency.code} onChange={(event) => handleCurrencySelection(event.target.value)} className="min-h-12 w-full shrink-0 rounded-xl border border-white/20 bg-[#111111] px-3 text-base">
              {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code} {currency.symbol} — {currency.name}</option>)}
            </select>
          </div>
        </dialog>, document.body
      )}
    </header>
  );
}
