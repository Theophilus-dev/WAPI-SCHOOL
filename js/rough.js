 
 
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



// ===== NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// ===== SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== HERO CAROUSEL SCRIPT =====
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;
let autoSlide;

// Update slide display
function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
    indicators[i].classList.toggle('active', i === index);
  });
  current = index;
}

// Next/Prev controls
function nextSlide() {
  showSlide((current + 1) % slides.length);
}
function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Indicators
indicators.forEach((btn, index) => {
  btn.addEventListener('click', () => showSlide(index));
});

// Auto-slide every 6 seconds
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 6000);
}
function stopAutoSlide() {
  clearInterval(autoSlide);
}

startAutoSlide();

// Pause when hovered
document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);




  document.getElementById("year").textContent = new Date().getFullYear();

// Admission page code
document.querySelector(".form-container").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for applying to WAPI Calabar! Your form has been submitted successfully.");
    this.reset();
  });

  // Gallery Section
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });






  document.querySelector(".signin-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Sign-in feature is under development. This is a demo section.");
});


 





