export class CustomButton extends HTMLElement {
  static get observedAttributes() {
    return ["label", "variant", "loading", "disabled", "href", "target"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }

        .wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border-radius: var(--radius10);
          cursor: pointer;
          border: none;
          text-decoration: none;
          text-align: center;
          transition: var(--transition-slow);
        }

        /* --- VARIANTS --- */
        .primary { 
            background: var(--primary-bold);
            color: var(--white);
            border: 2px solid var(--primary-bold);
        }
        .primary:hover:not(.loading):not(.disabled) { 
            background: var(--hover); 
            border: 2px solid var(--hover);
        }

        .secondary { 
            background: transparent; 
            color: var(--primary-bold); 
            border: 2px solid var(--primary-bold); 
        }
        .secondary:hover:not(.loading):not(.disabled) { 
            background: var(--hover); 
            color: var(--white);
            border: 2px solid var(--hover);
        }

        .hero-primary { 
            background: var(--primary-bold); 
            color: var(--white);
            border: 2px solid var(--primary-bold);
            padding: .8rem 2rem;
        }
        .hero-primary:hover:not(.loading):not(.disabled) { 
            background: var(--hover);
            border: 2px solid var(--hover);
        }

        .hero-secondary { 
            background: transparent;
            color: var(--primary-bold); 
            border: 2px solid var(--primary-bold);
            padding: .8rem 2rem;
        }
        .hero-secondary:hover:not(.loading):not(.disabled) { 
            background: white; 
            color: var(--white);
            background: var(--hover);
            border: 2px solid var(--hover);
        }

        /* INVERSE PRIMARY */
        .inverse-primary {
            background: var(--secondary);
            color: var(--white);
            border: none;
        }

        .inverse-primary:hover:not(.loading):not(.disabled) {
            background: var(--hover);
        }



        /* --- STATES --- */
        .btn-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
      }

        .wrapper:active:not(.loading):not(.disabled) { 
            transform: scale(0.97);
        }

        .disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        /* LOADING */
        .loader {
            display: flex;
            align-items: center;
            justify-content: center;
        }


        svg {
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .hidden { 
            display: none; 
        }
      </style>

        <a class="wrapper btn" part="button">
        <span class="btn-content">
            <span class="text"></span>
            <span class="loader hidden">
            <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="4"
                fill="none" stroke-linecap="round" stroke-dasharray="31.4 31.4"></circle>
            </svg>
            </span>
        </span>
        </a>
    `;
  }

  connectedCallback() { this.updateButton(); }
  attributeChangedCallback() { this.updateButton(); }

  updateButton() {
    const btn = this.shadowRoot.querySelector(".wrapper");
    const text = this.shadowRoot.querySelector(".text");
    const loader = this.shadowRoot.querySelector(".loader");

    const label = this.getAttribute("label") || "Button";
    const variant = this.getAttribute("variant") || "primary";

    const href = this.getAttribute("href");
    const target = this.getAttribute("target");

    const isLoading = this.hasAttribute("loading");
    const isDisabled = this.hasAttribute("disabled");

    // text
    text.textContent = label;

    // variant classes
    btn.className = `wrapper btn ${variant}`;

    // link behavior
    if (href) btn.setAttribute("href", href);
    else btn.removeAttribute("href");

    if (target) btn.setAttribute("target", target);
    if (target === "_blank") btn.setAttribute("rel", "noopener");

    // loading state
    if (isLoading) {
      loader.classList.remove("hidden");
      btn.classList.add("loading");
      btn.classList.add("disabled"); // disable interaction
    } else {
      loader.classList.add("hidden");
      text.style.opacity = "1";
      btn.classList.remove("loading");
    }

    // disabled state
    if (isDisabled) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  }
}

customElements.define("custom-button", CustomButton);