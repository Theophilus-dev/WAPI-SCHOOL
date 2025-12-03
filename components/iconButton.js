export class IconButton extends HTMLElement {
  static get observedAttributes() {
    return ["loading", "disabled", "href", "target"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --button-size: 40px;
          display: inline-block;
        }

        a.wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--button-size);
          height: var(--button-size);
          border-radius: 50%;
          cursor: pointer;
          background-color: var(--white);
          border: none;
          box-shadow: inset 4px 4px 8px 0 rgba(0, 108, 38, 0.1);
          transition: var(--transition-slow);
        }

        a.wrapper:hover:not(.disabled):not(.loading) {
          box-shadow: inset 0 -4px 8px 0 rgba(0, 108, 38, .02);
        }

        ::slotted(svg) {
          width: 50%;
          height: 50%;
        }

        .loader {
          display: none;
          align-items: center;
          justify-content: center;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading ::slotted(svg) { opacity: 0; }
        .loading .loader { display: flex; }

        .disabled {
          opacity: 0.5;
          pointer-events: none;
          cursor: not-allowed;
        }
      </style>

      <a class="wrapper" part="button">
        <slot name="svg"></slot>
        <span class="loader" part="loader">
          <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="4"
              fill="none" stroke-linecap="round" stroke-dasharray="31.4 31.4"></circle>
          </svg>
        </span>
      </a>
    `;
  }

  connectedCallback() { this.updateButton(); }
  attributeChangedCallback() { this.updateButton(); }

  updateButton() {
    const btn = this.shadowRoot.querySelector(".wrapper");

    const href = this.getAttribute("href");
    const target = this.getAttribute("target");

    const isLoading = this.hasAttribute("loading");
    const isDisabled = this.hasAttribute("disabled");

    // link behavior
    if (href) btn.setAttribute("href", href);
    else btn.removeAttribute("href");

    if (target) btn.setAttribute("target", target);
    if (target === "_blank") btn.setAttribute("rel", "noopener");

    // loading state
    if (isLoading) {
      btn.classList.add("loading");
      btn.classList.add("disabled");
    } else {
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

customElements.define("icon-button", IconButton);
