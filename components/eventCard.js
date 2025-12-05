class EventCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentIndex = 0;   // track how many cards shown
    this.batchSize = 3;      // how many to show per click
    this.events = [];        // will store JSON data
    this.isCollapsed = false;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }

        .wrapper {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
        }
        .card { 
                display: flex; 
                flex-direction: column; 
                gap: 14px; 
                padding: 14px; 
                width: 260px; 
                background: var(--white); 
                border: var(--border1); 
                box-shadow: var(--soft-shadow-buttom); 
                border-radius: var(--radius10);
                opacity: 0; 
                animation: fadeIn 0.5s ease forwards;
                animation-delay: var(--delay, 0s); /* stagger delay */
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card:hover {
                transform: translateY(-6px);
        }

        .image { 
                display: flex; 
                padding: 8px; 
                height: 154px; 
                background-size: cover; 
                background-position: center; 
                border: var(--border1); 
                border-radius: var(--radius8); 
        }

        .date-box { 
                display: flex; 
                flex-direction: column; 
                gap: 2px; 
                padding: 12px; 
                width: fit-content; 
                height: fit-content; 
                background: rgba(255, 255, 255, 0.8); 
                border-radius: var(--radius8); 
        }

        .day { 
                font-weight: var(--font-semibold); 
                font-size: 22px; 
                line-height: 20px; 
                text-align: center; 
                color: var(--text-black-body); 
        }

        .month { 
                font-weight: var(--font-medium); 
                font-size: 14px; 
                line-height: 15px; 
                text-align: center; 
                color: var(--text-black-heading); 
        }

        .details { 
                display: flex; 
                flex-direction: column; 
                align-items: flex-start; 
                gap: 8px; 
                text-align: left; 
                text-decoration: none; 
                flex: 1;
        }

        .title { 
                font-weight: var(--font-bold); 
                font-size: 18px; 
                line-height: 19px;
                color: var(--primary-bold); 
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                width: 100%; 
                transition: var(--transition-slow);
        }
        .title:hover {
                color: var(--primary);
        }

        .desc { 
                font-size: 14.6px; 
                color: var(--text-black-body); 
                flex: 1; 
                text-align: justify; 
        }

        .readmore { 
                display: flex; 
                gap: 2px; 
                cursor: pointer; 
                color: var(--primary); 
                font-weight: var(--font-bold); 
                font-size: 14.4px; 
                line-height: 14px; 
                transition: var(--transition-slow) ;
        }

        .readmore:hover { 
                color: var(--primary-bold);
                gap: 4px; 
        }

        svg { 
                width: 16px; 
                height: 16px; 
        }
        svg path { 
                stroke-width: 1.6; 
        }
        .load-more {
                background-color: var(--primary-bold);
                padding: 10px;
                border-radius: var(--radius8);
                color: var(--white);
                border: none;
                margin-top: 1rem;
                transition: var(--transition-slow);
                cursor: pointer;
        }
        .load-more:hover {
                background-color: var(--hover);
        }
      </style>

      <div class="wrapper"></div>
      <button class="load-more">Load more</button>
    `;
  }

  connectedCallback() {
    this.fetchData();
  }


  async fetchData() {
    try {
      const res = await fetch("data/events.json");
      this.events = await res.json();

      this.renderCards(); // Load first batch

      const btn = this.shadowRoot.querySelector(".load-more");
      btn.addEventListener("click", () => this.toggleLoad());

    } catch (err) {
      console.error("Failed to fetch event data:", err);
    }
  }

    toggleLoad() {
    const btn = this.shadowRoot.querySelector(".load-more");

    if (this.isCollapsed) {
      // Expand from start
      this.currentIndex = 0;
      this.shadowRoot.querySelector(".wrapper").innerHTML = "";
      this.renderCards();
      btn.textContent = "Load more";
      this.isCollapsed = false;
    } else {
      // Load next batch
      this.renderCards();

      // When done, change button to "Show Less"
      if (this.currentIndex >= this.events.length) {
        btn.textContent = "Show less";
        this.isCollapsed = true;
      }
    }
  }


  renderCards() {
    const container = this.shadowRoot.querySelector(".wrapper");
    const btn = this.shadowRoot.querySelector(".load-more");
    
    const end = this.currentIndex + this.batchSize;
    const batch = this.events.slice(this.currentIndex, end);

    batch.forEach((event, i) => {
      const card = document.createElement("div");
      card.className = "card";

      // stagger delay (0.1s between cards)
      card.style.setProperty("--delay", `${i * 0.12}s`);


      card.innerHTML = `
        <div class="image" style="background-image:url('${event.image}')">
          <div class="date-box">
            <div class="day">${event.day}</div>
            <div class="month">${event.month}</div>
          </div>
        </div>

        <a class="details" target="_blank"
           href="events-tmp-page.html?id=${event.id}">
          <div class="title">${event.title}</div>
          <div class="desc">${event.description}</div>
          <div class="readmore">
            <span class="read-text">Read More</span>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M6 4.4S10.6 4.07 11.27 4.72C11.93 5.37 11.56 10 11.56 10M11 5L4.33 11.66"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>
      `;

      container.appendChild(card);
   });

     // Update index
    this.currentIndex = end;

    // update button label
    if (this.currentIndex >= this.events.length) {
      btn.textContent = "Show less";
      this.isCollapsed = true;
    } else {
      btn.textContent = "Load more";
    }
  }
}

customElements.define("event-card", EventCard);
