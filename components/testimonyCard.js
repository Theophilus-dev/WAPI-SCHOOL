import './iconButton.js';

class TestimonyCard extends HTMLElement {
  static get observedAttributes() {
    return ["data", "src"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentIndex = 0;
    this.testimonies = [];

    this.shadowRoot.innerHTML = `
      <style>
        .testimonial {
          padding: 20px;
          border-radius: var(--radius10);
          background: var(--primary-bold);
          box-shadow: var(--soft-shadow-buttom);
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 200px;
        }

        .main-text-container {
            flex-grow: 1;
        }

        .quote-mark svg {
          width: 40px;
          height: 40px;
          color: var(--white);
        }
        .nodge {
          fill: #dcdcdcff;
        }

        p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.4;
          text-align: left;
          color: var(--testimony-text);
          font-weight: var(--font-regular);
        }

        .down {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .name h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: var(--font-semibold);
          color: var(--white);
          text-align: left;
        }

        .name p {
          opacity: 0.8;
          color: var(--testimony-subtitle);
          text-align: left;
          font-size: .9rem;
        }

        .nav {
          display: flex;
          gap: 10px;
        }
        
      </style>

      <div class="testimonial"> 
        <div class="quote-mark">
          <!-- Inline SVG quote -->
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="nodge" d="M16.6666 13.3333C16.6666 16.476 16.6666 18.0473 15.6903 19.0236C14.714 20 13.1427 20 9.99998 20C6.85728 20 5.28593 20 4.30963 19.0236C3.33331 18.0473 3.33331 16.476 3.33331 13.3333C3.33331 10.1906 3.33331 8.61924 4.30963 7.64294C5.28593 6.66663 6.85728 6.66663 9.99998 6.66663C13.1427 6.66663 14.714 6.66663 15.6903 7.64294C16.6666 8.61924 16.6666 10.1906 16.6666 13.3333Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M16.6667 11.6666V19.1368C16.6667 25.7578 12.4738 31.3728 6.66669 33.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path class="nodge" d="M36.6666 13.3333C36.6666 16.476 36.6666 18.0473 35.6903 19.0236C34.714 20 33.1426 20 30 20C26.8573 20 25.286 20 24.3096 19.0236C23.3333 18.0473 23.3333 16.476 23.3333 13.3333C23.3333 10.1906 23.3333 8.61924 24.3096 7.64294C25.286 6.66663 26.8573 6.66663 30 6.66663C33.1426 6.66663 34.714 6.66663 35.6903 7.64294C36.6666 8.61924 36.6666 10.1906 36.6666 13.3333Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M36.6667 11.6666V19.1368C36.6667 25.7578 32.4739 31.3728 26.6667 33.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="main-text-container">
        <p id="text"></p>
        </div>

        <div class="down"> 
          <div class="name">
            <h3 id="name"></h3>
            <p id="subtitle"></p>
          </div>

          <div class="nav">
            <icon-button id="prev">
                <svg slot="svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16669 20.0033H31.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.3332 30.0034C18.3332 30.0034 8.33333 22.6384 8.33331 20.0032C8.3333 17.368 18.3334 10.0033 18.3334 10.0033" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </icon-button>

            <icon-button id="next">
                <svg slot="svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.8334 20H8.33331" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6667 30C21.6667 30 31.6667 22.6352 31.6667 20C31.6667 17.3647 21.6667 10 21.6667 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </icon-button>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
  const src = this.getAttribute("src");

  if (src) {
    this._loadFromURL(src);
  } else {
    this._loadData();
    this._renderCurrent();
  }

  this._bindEvents();
 }



  attributeChangedCallback(name, oldValue, newValue) {
  if (oldValue === newValue) return;

  if (name === "data") {
    this._loadData();
    this.currentIndex = 0;
    this._renderCurrent();
  }

  if (name === "src" && newValue) {
    this._loadFromURL(newValue);
  }
 }


  _loadData() {
    try {
      const dataAttr = this.getAttribute("data");
      this.testimonies = dataAttr ? JSON.parse(dataAttr) : [];
    } catch (e) {
      console.error("Invalid JSON for testimonies:", e);
      this.testimonies = [];
    }
  }

  _bindEvents() {
    const prevBtn = this.shadowRoot.getElementById("prev");
    const nextBtn = this.shadowRoot.getElementById("next");

    prevBtn.addEventListener("click", () => {
      if (this.testimonies.length === 0) return;
      this.currentIndex = (this.currentIndex - 1 + this.testimonies.length) % this.testimonies.length;
      this._renderCurrent();
    });

    nextBtn.addEventListener("click", () => {
      if (this.testimonies.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.testimonies.length;
      this._renderCurrent();
    });
  }

  _renderCurrent() {
    if (!this.testimonies.length) return;

    const current = this.testimonies[this.currentIndex];
    this.shadowRoot.getElementById("text").textContent = current.text || "";
    this.shadowRoot.getElementById("name").textContent = current.name || "";
    this.shadowRoot.getElementById("subtitle").textContent = current.subtitle || "";
  }

  async _loadFromURL(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    this.testimonies = json;
    this.currentIndex = 0;
    this._renderCurrent();
  } catch (e) {
    console.error("Failed to load JSON:", e);
  }
 }

}

customElements.define("testimony-card", TestimonyCard);
