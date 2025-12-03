export class HamburgerMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .bg {
          cursor: pointer;
          background: var(--hamburger-bg);
          padding: 4px;
          border-radius: 5px;
          display: none;
        }
        .bar {
          width: 24px;
          height: 2px;
          border-radius: 6px;
          background: var(--hamburger-bars);
          margin: 6px;
          transition: 0.3s ease;
        }
        :host([open]) #bar1 {
            transform: translateY(8px) rotate(45deg);
            }

        :host([open]) #bar2 {
            opacity: 0;
            }

        :host([open]) #bar3 {
            transform: translateY(-8px) rotate(-45deg);
            }
        
        @media (max-width: 768px) {
            .bg {
                display: block;
            }
        }

      </style>
        <div class="bg">
            <div class="bar" id="bar1"></div>
            <div class="bar" id="bar2"></div>
            <div class="bar" id="bar3"></div>
        </div>
    `; 
  }
}

customElements.define("hamburger-menu", HamburgerMenu);
