class ResponsiveNav extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        nav {
          background: transparent;
          padding: 1rem var(--desktop-section-side-padding);
          display: flex;
          align-items: center;
          justify-content: start;
        }
        nav.scrolled {
          background-color: var(--nav-bg-scrolled);
          box-shadow: var(--soft-shadow-bottom);
          backdrop-filter: blur(10px);
          transition: var(--transition-fast);
          border-bottom: var(--border1);
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          height: 40px;
          width: auto;
        }

        .menu-items {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex: 1;
        }

        .portalLg {
          display: flex;
        }
        
        .portalSm {
          display: none;
        }
        
        .menu-toggle {
          display: none;
          cursor: pointer;
        }


        /* MOBILE */
        @media (max-width: 768px) {
          nav {
            padding: var(--mobile-section-side-padding);
          }

          .logo {
            flex: 1;
          }

          .menu-items {
            position: fixed;
            top: 0;
            left: -300px;
            width: 230px;
            height: auto;
            border-radius: var(--radius10);
            border: var(--border1);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
            gap: 16px;
            background: var(--nav-bg);
            transition: left 0.3s ease;
            box-shadow: var(--hard-shadow-right);
          }
        
          .menu-items.open {
            left: 0px;
          }
        
         .portalSm {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .portalLg {
             display: none;
          }

          .menu-toggle {
            display: block;
          }
        }
      </style>

      <nav>
        <div class="logo"><img src="image/public/wapi-logo.png" alt="Logo"/></div>

        <div class="menu-toggle"><hamburger-menu></hamburger-menu></div>

        <div class="menu-items">
          <menu-button label="Home" variant="menu-btn" href="index.html"></menu-button>
          <menu-button label="About" variant="menu-btn" href="about.html"></menu-button>
          <menu-button label="Contact" variant="menu-btn" href="contact.html"></menu-button>
          <menu-button label="Gallery" variant="menu-btn" href="gallery.html"></menu-button>
          <menu-button class="portalSm portal-btn" label="Portal" variant="portal" href="signin.html"></menu-button>
        </div>
        
        <menu-button class="portalLg portal-btn" label="Portal" variant="portal" href="signin.html"></menu-button>
      </nav>
    `;

    const toggle = shadow.querySelector('.menu-toggle');
    const menu = shadow.querySelector('.menu-items');
    const hamburger = shadow.querySelector('hamburger-menu');
    const nav = shadow.querySelector("nav");

    // MOBILE MENU TOGGLE
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      hamburger.toggleAttribute('open');
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });

    
    // Diable portal menu-button on portal login page
    const portalBtns = shadow.querySelectorAll('.portal-btn');

    if (window.location.pathname.endsWith('signin.html')) {
      portalBtns.forEach(btn => {
        btn.style.opacity = '0.2';
        btn.style.pointerEvents = 'none';
        btn.style.cursor = 'not-allowed';
      });
    }

  }
}

customElements.define('responsive-nav', ResponsiveNav);