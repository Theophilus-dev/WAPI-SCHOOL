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
 
// Nav header scroll listener
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



// Hero typewriting effect
const heroHeading = document.getElementById("hero-heading");

if (heroHeading) {
  const text = "Welcome to West Africa People's Institute";
  let i = 0;

  function type() {
    if (i < text.length) {
      heroHeading.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100); // typing speed
    }
  }

  type();
}




// Back to top button
const btn = document.getElementById("back-to-top");

if (btn) {
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
}




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




/* Breadcrumb */
function createBreadcrumb() {
  // Select ID first, fallback to class
  const breadcrumb =
    document.getElementById("breadcrumb") ||
    document.querySelector(".breadcrumb");

  // If neither exists → stop
  if (!breadcrumb) return;

  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);

  let builtPath = "/";
  let html = `<a href="/">Home</a>`;

  segments.forEach((segment, index) => {
    builtPath += segment + "/";

    const label = segment
      .replace(/-/g, " ")
      .replace(/\.\w+$/, "")
      .replace(/\b\w/g, l => l.toUpperCase());

    if (index === segments.length - 1) {
      html += ` <span>/</span> <span class="active">${label}</span>`;
    } else {
      html += ` <span>/</span> <a href="${builtPath}">${label}</a>`;
    }
  });

  breadcrumb.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", createBreadcrumb);



// Form logic
const schoolId = document.getElementById("school-id");
const schoolIdField = document.getElementById("input-field1");

if (schoolId && schoolIdField) {
  schoolId.addEventListener("focus", () => schoolIdField.classList.add("active"));
  schoolId.addEventListener("blur", () => schoolIdField.classList.remove("active"));
}

const password = document.getElementById("password");
const passwordField = document.getElementById("input-field2");

if (password && passwordField) {
  password.addEventListener("focus", () => passwordField.classList.add("active"));
  password.addEventListener("blur", () => passwordField.classList.remove("active"));
}

// ===== Form submit button =====
const submitBtn = document.getElementById("signin-btn");
const formContainer = document.getElementById("signin-form");

if (submitBtn && formContainer) {
  submitBtn.addEventListener("click", () => {
    if (navigator.vibrate) navigator.vibrate(150);
    formContainer.classList.add("shake");
    setTimeout(() => formContainer.classList.remove("shake"), 1000);
    setTimeout(() => formContainer.classList.remove("fadeout-form-bg-shapes"), 1000);
  });
}

// ===== Background shapes =====
const balls = [
  { el: document.getElementById("star1"), x: 0, y: 0, speed: 0.025, phase: Math.random() * Math.PI * 2 },
  { el: document.getElementById("star2"), x: 0, y: 0, speed: 0.018, phase: Math.random() * Math.PI * 2 }
].filter(ball => ball.el !== null); // Only include existing elements

if (balls.length) {
  let targetX = 0;
  let targetY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX * 0.04;
    targetY = e.clientY * 0.04;
  });

  function animate() {
    const time = Date.now() * 0.001;
    balls.forEach(ball => {
      ball.x += (targetX - ball.x) * ball.speed;
      ball.y += (targetY - ball.y) * ball.speed;

      const floatX = Math.sin(time + ball.phase) * 5;
      const floatY = Math.cos(time + ball.phase) * 5;

      ball.el.style.transform = `translate(${ball.x + floatX}px, ${ball.y + floatY}px)`;
    });
    requestAnimationFrame(animate);
  }

  animate();
}





// All login for events
let allEvents = [];    // store all events
let currentIndex = 0;  // current event index

async function loadEvent() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.querySelector(".post-top-section");

  if (!id) {
    if (container) container.innerHTML = "<p>Event not found</p>";
    return;
  }

  try {
    const res = await fetch("./data/events.json");
    const data = await res.json();

    const event = data.find(e => e.id.toString() === id);

    if (!event) {
      if (container) container.innerHTML = "<p>Event not found</p>";
      return;
    }

    allEvents = data; // store all events
    currentIndex = allEvents.findIndex(e => e.id.toString() === id);

    loadEventByIndex(currentIndex); // render current event

  } catch (err) {
    console.error("Failed to load event:", err);
    if (container) container.innerHTML = "<p>Failed to load event</p>";
  }
}

// Render an event by index safely
function loadEventByIndex(index) {
  const event = allEvents[index];
  if (!event) return; 

  // update page title
  document.title = `${event.title} | Wapi School`;

  // Update URL without reload
  window.history.replaceState(null, "", `${window.location.pathname}?id=${event.id}`);

  const titleEl = document.getElementById("title");
  const dateEl = document.getElementById("date");
  const yearEl = document.getElementById("year");
  const imageEl = document.getElementById("image");
  const descEl = document.getElementById("description");
  const contentEl = document.getElementById("event-content");

  if (titleEl) titleEl.textContent = event.title || "";
  if (dateEl) dateEl.textContent = event.day && event.month ? `${event.day} ${event.month}` : "";
  if (yearEl) yearEl.textContent =event.year || "";
  if (imageEl) imageEl.src = event.image || "";
  if (descEl) descEl.textContent = event.description || "";

  if (contentEl) {
    contentEl.innerHTML = "";
    const paragraphs = Array.isArray(event.content)
      ? event.content
      : (event.content ? event.content.split("\n\n") : []);

    paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      p.style.opacity = "0";
      p.style.transform = "translateY(20px)";
      p.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      contentEl.appendChild(p);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    contentEl.querySelectorAll("p").forEach(p => observer.observe(p));
  }
}

// Navigation buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn?.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = allEvents.length - 1;
  loadEventByIndex(currentIndex);
});

nextBtn?.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= allEvents.length) currentIndex = 0;
  loadEventByIndex(currentIndex);
});

document.addEventListener("DOMContentLoaded", loadEvent);



//Social media share button
const facebookBtn = document.getElementById("facebookShare");
const normalShareBtn = document.getElementById("normalShare");
const copyLinkBtn = document.getElementById("copyLink");

function getCurrentUrl() {
  return window.location.href;
}

// Facebook share
facebookBtn?.addEventListener("click", () => {
  const url = encodeURIComponent(getCurrentUrl());
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
});

// Normal share (Web Share API)
normalShareBtn?.addEventListener("click", async () => {
  const url = getCurrentUrl();
  const title = document.getElementById("title")?.textContent || "Check this event";
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        url: url,
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    alert("Web Share not supported. Use 'Copy Link' instead.");
  }
});

// Copy to clipboard
copyLinkBtn?.addEventListener("click", () => {
  const url = getCurrentUrl();
  navigator.clipboard.writeText(url)
    .then(() => alert("Event URL copied!"))
    .catch(() => alert("Failed to copy URL."));
});






// //Old event logic

// let allEvents = [];    // store all events
// let currentIndex = 0;  // current event index

// async function loadEvent() {
//   const params = new URLSearchParams(window.location.search);
//   const id = params.get("id");

//   const container = document.querySelector(".post-top-section");

//   if (!id) {
//     if (container) container.innerHTML = "<p>Event not found</p>";
//     return;
//   }

//   try {
//     const res = await fetch("./data/events.json");
//     const data = await res.json();

//     const event = data.find(e => e.id.toString() === id);

//     if (!event) {
//       if (container) container.innerHTML = "<p>Event not found</p>";
//       return;
//     }

//     allEvents = data; // store all events
//     currentIndex = allEvents.findIndex(e => e.id.toString() === id);

//     loadEventByIndex(currentIndex); // render current event

//   } catch (err) {
//     console.error("Failed to load event:", err);
//     if (container) container.innerHTML = "<p>Failed to load event</p>";
//   }
// }

// // Render an event by index safely
// function loadEventByIndex(index) {
//   const event = allEvents[index];
//   if (!event) return;

//   // Update URL without reload
//   window.history.replaceState(null, "", `${window.location.pathname}?id=${event.id}`);

//   const titleEl = document.getElementById("title");
//   const dateEl = document.getElementById("date");
//   const imageEl = document.getElementById("image");
//   const descEl = document.getElementById("description");
//   const contentEl = document.getElementById("event-content");

//   if (titleEl) titleEl.textContent = event.title || "";
//   if (dateEl) dateEl.textContent = event.day && event.month ? `${event.day} ${event.month}` : "";
//   if (imageEl) imageEl.src = event.image || "";
//   if (descEl) descEl.textContent = event.description || "";

//   if (contentEl) {
//     contentEl.innerHTML = "";
//     const paragraphs = Array.isArray(event.content)
//       ? event.content
//       : (event.content ? event.content.split("\n\n") : []);

//     paragraphs.forEach(text => {
//       const p = document.createElement("p");
//       p.textContent = text;
//       p.style.opacity = "0";
//       p.style.transform = "translateY(20px)";
//       p.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//       contentEl.appendChild(p);
//     });

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = "1";
//           entry.target.style.transform = "translateY(0)";
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.1 });

//     contentEl.querySelectorAll("p").forEach(p => observer.observe(p));
//   }
// }

// // Navigation buttons
// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");

// prevBtn?.addEventListener("click", () => {
//   currentIndex--;
//   if (currentIndex < 0) currentIndex = allEvents.length - 1;
//   loadEventByIndex(currentIndex);
// });

// nextBtn?.addEventListener("click", () => {
//   currentIndex++;
//   if (currentIndex >= allEvents.length) currentIndex = 0;
//   loadEventByIndex(currentIndex);
// });

// document.addEventListener("DOMContentLoaded", loadEvent);

