(() => {
  const navMarkup = `
    <header id="kavora-site-header" class="kavora-site-header">
      <nav class="kavora-nav-inner" aria-label="Main navigation">
        <a href="index.html#home" class="kavora-logo" aria-label="Kavora Africa Home">
          <img src="thumbs/(LOGO 3) Tree left kavora right transparent bg.svg" alt="Kavora Africa">
        </a>

        <div class="kavora-desktop-links">
          <a href="index.html#home">Home</a>
          <a href="index.html#journeys">Journeys</a>
          <a href="index.html#destinations">Destinations</a>
          <a href="index.html#about">About</a>
          <a href="index.html#contact">Contact Us</a>
        </div>

        <a class="kavora-desktop-cta" href="booking.html">
          <span>Design My Experience</span>
        </a>

        <button
          id="kavora-menu-toggle"
          class="kavora-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="kavora-mobile-menu"
        >
          <span class="kavora-menu-icon" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
        </button>
      </nav>

      <div id="kavora-mobile-menu" class="kavora-mobile-menu" aria-hidden="true" inert>
        <nav class="kavora-mobile-links" aria-label="Mobile navigation">
          <a href="index.html#home">Home</a>
          <a href="index.html#journeys">Journeys</a>
          <a href="index.html#destinations">Destinations</a>
          <a href="index.html#about">About</a>
          <a href="index.html#journal">Journal</a>
          <a href="index.html#contact">Contact Us</a>
          <a class="kavora-mobile-cta" href="booking.html">Design My Experience</a>
        </nav>
        <p class="kavora-mobile-caption">Luxury Travel Concierge</p>
      </div>
    </header>`;

  const navStyles = `
    .kavora-site-header {
      position: fixed;
      inset: 0 0 auto;
      z-index: 9999;
      color: #fff;
      transition: background-color 500ms ease, box-shadow 500ms ease, backdrop-filter 500ms ease;
    }
    .kavora-site-header.is-scrolled {
      background: rgba(11, 33, 26, 0.95);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
    }
    .kavora-nav-inner {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1600px;
      height: 96px;
      margin: 0 auto;
      padding: 0 48px;
      transition: height 500ms ease;
    }
    .kavora-site-header.is-scrolled .kavora-nav-inner { height: 80px; }
    .kavora-logo {
      position: relative;
      z-index: 2;
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      margin-left: -20px;
    }
    .kavora-logo img {
      display: block;
      width: auto;
      height: 112px;
      object-fit: contain;
      transition: transform 500ms ease;
    }
    .kavora-logo:hover img { transform: scale(1.05); }
    .kavora-desktop-links {
      display: flex;
      align-items: center;
      gap: 32px;
    }
    .kavora-desktop-links a,
    .kavora-desktop-cta {
      color: rgba(255, 255, 255, 0.9);
      font: 500 10px/1.5 Manrope, sans-serif;
      letter-spacing: 0.22em;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 300ms ease;
    }
    .kavora-desktop-links a:hover { color: #c8a96b; }
    .kavora-desktop-cta {
      position: relative;
      overflow: hidden;
      padding: 12px 24px;
      border: 1px solid #c8a96b;
      font-weight: 600;
      letter-spacing: 0.24em;
    }
    .kavora-desktop-cta::before {
      position: absolute;
      inset: 0;
      background: #c8a96b;
      content: "";
      transform: translateX(-101%);
      transition: transform 500ms ease;
    }
    .kavora-desktop-cta:hover::before { transform: translateX(0); }
    .kavora-desktop-cta span { position: relative; z-index: 1; }
    .kavora-desktop-cta:hover { color: #0b211a; }
    .kavora-menu-toggle {
      position: relative;
      z-index: 3;
      display: none;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 0;
      background: transparent;
      color: #c8a96b;
      cursor: pointer;
    }
    .kavora-menu-icon { position: relative; display: block; width: 20px; height: 16px; }
    .kavora-menu-icon span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
      transition: top 300ms ease, transform 300ms ease, opacity 300ms ease;
    }
    .kavora-menu-icon span:nth-child(1) { top: 0; }
    .kavora-menu-icon span:nth-child(2) { top: 7.5px; }
    .kavora-menu-icon span:nth-child(3) { top: 15px; }
    .kavora-menu-toggle[aria-expanded="true"] .kavora-menu-icon span:nth-child(1) {
      top: 7.5px;
      transform: rotate(45deg);
    }
    .kavora-menu-toggle[aria-expanded="true"] .kavora-menu-icon span:nth-child(2) { opacity: 0; }
    .kavora-menu-toggle[aria-expanded="true"] .kavora-menu-icon span:nth-child(3) {
      top: 7.5px;
      transform: rotate(-45deg);
    }
    .kavora-mobile-menu {
      position: absolute;
      inset: 0 0 auto;
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      box-sizing: border-box;
      padding: 128px 32px 40px;
      background: #0b211a;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      transition: opacity 500ms ease, visibility 500ms ease;
    }
    .kavora-mobile-menu.is-open {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
    .kavora-mobile-links { display: flex; flex-direction: column; }
    .kavora-mobile-links a {
      padding: 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font: 400 28px/1.2 "Cormorant Garamond", Georgia, serif;
      text-decoration: none;
    }
    .kavora-mobile-links a:hover,
    .kavora-mobile-links .kavora-mobile-cta { color: #c8a96b; }
    .kavora-mobile-caption {
      margin: auto 0 0;
      color: #c8a96b;
      font: 500 10px/1.5 Manrope, sans-serif;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    @media (max-width: 1023px) {
      .kavora-nav-inner { padding: 0 24px; }
      .kavora-desktop-links, .kavora-desktop-cta { display: none; }
      .kavora-menu-toggle { display: flex; }
      .kavora-logo img { height: 96px; }
    }
    @media (max-width: 480px) {
      .kavora-nav-inner { height: 80px; padding: 0 20px; }
      .kavora-site-header.is-scrolled .kavora-nav-inner { height: 72px; }
      .kavora-logo { margin-left: -12px; }
      .kavora-logo img { height: 84px; }
      .kavora-mobile-menu { padding: 112px 24px 32px; }
      .kavora-mobile-links a { font-size: 25px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .kavora-site-header, .kavora-nav-inner, .kavora-logo img, .kavora-mobile-menu,
      .kavora-menu-icon span, .kavora-desktop-links a, .kavora-desktop-cta,
      .kavora-desktop-cta::before { transition-duration: 0.01ms; }
    }`;

  const existingHeader = Array.from(document.body.querySelectorAll("header")).find(header =>
    header.querySelector("nav, #menu-toggle, #menuToggle, button[aria-label*='menu' i]") ||
    header.querySelector("a[href='index.html']")
  );
  const style = document.createElement("style");
  style.textContent = navStyles;
  document.head.append(style);

  const template = document.createElement("template");
  template.innerHTML = navMarkup;
  const navbar = template.content.firstElementChild;
  if (existingHeader) {
    existingHeader.replaceWith(navbar);
  } else {
    document.body.prepend(navbar);
  }

  const menuToggle = navbar.querySelector("#kavora-menu-toggle");
  const mobileMenu = navbar.querySelector("#kavora-mobile-menu");
  const setMenuOpen = open => {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.inert = !open;
  };
  const updateScrollState = () => navbar.classList.toggle("is-scrolled", window.scrollY > 40);

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) setMenuOpen(false);
  });
  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
})();
