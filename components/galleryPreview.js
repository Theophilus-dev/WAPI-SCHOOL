class GalleryPreview extends HTMLElement {
  static get observedAttributes() {
    return ["img1", "img2", "img3", "img4"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .bento-grid {
          display: grid;
          gap: 9px;
          grid-template-columns: 1fr 1fr;   /* 2-column structure */
          grid-template-rows: auto auto;    /* top + bottom */
        }

        .item-top {
          grid-column: 1 / span 2; /* spans full width */
          height: 300px;
          transition: var(--transition-slow);
        }

        .item-left {
          grid-row: span 2;        /* tall */
        }

        .item-right-top,
        .item-right-bottom {
          grid-column: 2;          /* right section only */
          height: 145px;           /* half of the tall left side */
        }

        .item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius10);
          display: block;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }

          .item-top {
            grid-column: 1;
            height: 200px;
          }

          .item-left {
            grid-row: span 1;
            height: 180px;
          }

          .item-right-top,
          .item-right-bottom {
            grid-column: 1;
            height: 150px;
          }
        }
      </style>

      <div class="bento-grid">
        <div class="item item-top">
          <img id="img1" src="" alt="">
        </div>

        <div class="item item-left">
          <img id="img2" src="" alt="">
        </div>

        <div class="item item-right-top">
          <img id="img3" src="" alt="">
        </div>

        <div class="item item-right-bottom">
          <img id="img4" src="" alt="">
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.updateImages();
  }

  attributeChangedCallback() {
    this.updateImages();
  }

  updateImages() {
    ["img1", "img2", "img3", "img4"].forEach((key) => {
      const el = this.shadowRoot.querySelector(`#${key}`);
      if (el) el.src = this.getAttribute(key) || "";
    });
  }
}

customElements.define("gallery-preview", GalleryPreview);
