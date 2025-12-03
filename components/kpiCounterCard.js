export class KpiCounterCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "value", "prefix", "suffix", "animated"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 16px 24px;
          border-radius: var(--radius10, 12px);
          background-color: transparent;
        }

        .title {
          font-size: 0.875rem;
          font-weight: var(--font-medium);
          color: var(--text-black-body);
          margin-bottom: 4px;
          text-align: center;
        }

        .value {
          font-size: 2rem;
          font-weight: var(--font-semibold);
          color: var(--text-black-heading);
          display: flex;
          align-items: center;
          gap: 2px;
        }

      </style>

      <div class="card">
        <div class="title"></div>
        <div class="value">
          <span class="prefix"></span>
          <span class="number">0</span>
          <span class="suffix"></span>
        </div>
      </div>
    `;
  }

  connectedCallback() { this.updateCard(); }
  attributeChangedCallback() { this.updateCard(); }

  updateCard() {
    const title = this.getAttribute("title") || "KPI";
    const value = parseFloat(this.getAttribute("value")) || 0;
    const prefix = this.getAttribute("prefix") || "";
    const suffix = this.getAttribute("suffix") || "";
    const animated = this.hasAttribute("animated");

    this.shadowRoot.querySelector(".title").textContent = title;
    this.shadowRoot.querySelector(".prefix").textContent = prefix;
    this.shadowRoot.querySelector(".suffix").textContent = suffix;

    if (animated) {
      this.animateCounter(0, value, 1500);
    } else {
      this.shadowRoot.querySelector(".number").textContent = value;
    }
  }

  animateCounter(start, end, duration) {
    const numberEl = this.shadowRoot.querySelector(".number");
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      numberEl.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        numberEl.textContent = end;
      }
    };

    requestAnimationFrame(step);
  }
}

customElements.define("kpi-counter-card", KpiCounterCard);