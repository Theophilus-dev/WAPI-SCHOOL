// Import the components to be registered in this file
import './components/navBar.js';
import './components/hamburgerMenu.js';
import './components/menuButton.js';
import './components/customButton.js';
import './components/kpiCounterCard.js';
import './components/galleryPreview.js';
import './components/iconCard.js';
import './components/testimonyCard.js';
import './components/eventCard.js'
import './components/admissionBanner.js'
import './components/footerBlock.js'

// Call the registration after each importation, to define the custom element
// defineResponsiveNav();
// defineHamburgerMenu();
// defineMenuButton();
// defineCustomButton();
// defineKpiCounterCard();
// defineGalleryPreview();
// defineIconCard();
// defineTestimonyCard();
// defineEventCard();




// ===== Main Js Code Starts After This Line ===== //
 
// Header scroll listener
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");

    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

 
 // Get the current page name
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Select all nav links
  const navLinks = document.querySelectorAll(".site-nav a");

  // Remove any existing active class
  navLinks.forEach(link => link.classList.remove("active"));

  // Add active only to the matching page link
  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });



  
  async function loadEvent() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.querySelector(".post-top-section");

  if (!id) {
    if (container) container.innerHTML = "<p>Event not found</p>";
    return;
  }

  try {
    const res = await fetch("/data/events.json");
    const data = await res.json();

    const event = data.find(e => e.id.toString() === id);

    if (!event) {
      if (container) container.innerHTML = "<p>Event not found</p>";
      return;
    }

    // Fill the template
    document.title = event.title;
    const titleEl = document.getElementById("title");
    const dateEl = document.getElementById("date");
    const imageEl = document.getElementById("image");
    const descEl = document.getElementById("description");
    const contentEl = document.getElementById("event-content");

    if (titleEl) titleEl.textContent = event.title;
    if (dateEl) dateEl.textContent = `${event.day} ${event.month}`;
    if (imageEl) imageEl.src = event.image;
    if (descEl) descEl.textContent = event.description;
    if (contentEl) contentEl.innerHTML = event.content;

  } catch (err) {
    console.error("Failed to load event:", err);
    if (container) container.innerHTML = "<p>Failed to load event</p>";
  }
}

// Wait for DOM content to be ready
document.addEventListener("DOMContentLoaded", loadEvent);




// Hero typwriting effect
  const text = "Welcome to West Africa People's Institute";
  let i = 0;

  function type() {
    if (i < text.length) {
      document.getElementById("hero-heading").innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100); // typing speed
    }
  }

  type();



  /* Back to top button */
  const btn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
      btn.classList.remove("hide");
    } else {
      btn.classList.add("hide");
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });



/* Section animation */
  const sections = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));