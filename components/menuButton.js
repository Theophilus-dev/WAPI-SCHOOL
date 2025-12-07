export class MenuButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const label = this.getAttribute("label") || "Button";
    const variant = this.getAttribute("variant") || "menu-btn";
    const href = this.getAttribute("href") || "#";

    shadow.innerHTML = `
      <style>
        a {
          all: unset;
          cursor: pointer;
          padding: 8px 20px;
          font-size: .9rem;
          text-align: center;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          display: flex;
          width: 100%;
        }

        a.menu-btn {
          color: var(--menu-items);
          background: transparent;
          font-weight: var(--font-medium);
          width: auto;
        }

        a.menu-btn:hover {
          color: var(--menu-items-hover);
        }

        a.menu-btn.active {
          color: var(--menu-items-hover);
          font-weight: var(--font-semibold);
        }

        a.portal {
          color: var(--white);
          background: var(--secondary);
          font-weight: var(--font-medium);
          border-radius: var(--radius8);
        }

        a.portal:hover {
          background: var(--hover);
          box-shadow: var(--soft-shadow-buttom);
        }

        a.portal.active {
          background: var(--hover);
        }
      </style>

      <a href="${href}" class="${variant}">${label}</a>
    `;

    const link = shadow.querySelector('a');

    // Set active based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const linkPath = new URL(href, window.location.origin).pathname.split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }

    // Bubble click event if needed
    link.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('menu-click', {
        detail: { label, href },
        bubbles: true
      }));
    });
  }
}

  customElements.define('menu-button', MenuButton);