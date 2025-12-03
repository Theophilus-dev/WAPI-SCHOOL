class IconCard extends HTMLElement {
    static get observedAttributes() {
        return ["title", "description"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <style>
            .card-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 280px;
                gap: .8rem;
                padding: 20px;
                margin: 5px;
                border-radius: var(--radius10);
                background: var(--white);
                border: var(--border1);
                box-shadow: var(--soft-shadow-buttom);
                transition: var(--transition-slow);
            }
            .card-container:hover {
                transform: translateY(-.6rem)
                }

            ::slotted(svg) {
                width: 34px;
                height: 34px;
                display: block;
            }

            h2 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: var(--font-semibold);
                text-align: center;
                color: var(--text-black-heading);
                margin-bottom: -.8rem;
            }

            p {
                font-size: .9rem;
                font-weight: var(--font-regular);
                text-align: center;
                color: var(--text-black-body)
            }
        </style>

        <div class="card-container">
            <div id="icon">
                <slot name="icon"></slot>
            </div>
            <div class="description">
                <h2 id="card-title"></h2>
                <p id="card-desc"></p>
            </div>
        </div>
        `;
    }

    connectedCallback() {
        this.updateContent();
    }

    attributeChangedCallback() {
        this.updateContent();
    }

    updateContent() {
        this.shadowRoot.querySelector("#card-title").textContent =
            this.getAttribute("title") || "";

        this.shadowRoot.querySelector("#card-desc").textContent =
            this.getAttribute("description") || "";
    }
}

customElements.define("icon-card", IconCard);