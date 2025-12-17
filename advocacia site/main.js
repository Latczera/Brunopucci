 // Navegação suave e menu compacto em mobile
const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".nav-toggle");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  navLinks.addEventListener("click", (evt) => {
    if (evt.target.tagName === "A") {
      navLinks.classList.remove("nav-open");
    }
  });
}

// Rolagem suave para âncoras internas
document.addEventListener("click", (evt) => {
  const link = evt.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href").slice(1);
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  evt.preventDefault();
  const rect = targetEl.getBoundingClientRect();
  const offset = window.pageYOffset || document.documentElement.scrollTop;
  const top = rect.top + offset - 64;

  window.scrollTo({
    top: top < 0 ? 0 : top,
    behavior: "smooth",
  });
});

 // Carrossel experiencial — scroll horizontal + setas discretas
const experientialCarousel = document.querySelector(".editorial-carousel");
if (experientialCarousel) {
  const strip = experientialCarousel.querySelector(".carousel-strip");
  const leftArrow = experientialCarousel.querySelector(".carousel-arrow-left");
  const rightArrow = experientialCarousel.querySelector(".carousel-arrow-right");

  const SCROLL_STEP = 260;

  function updateArrowState() {
    if (!strip) return;
    const maxScroll = strip.scrollWidth - strip.clientWidth;
    const current = strip.scrollLeft;

    if (leftArrow) {
      leftArrow.disabled = current <= 2;
    }
    if (rightArrow) {
      rightArrow.disabled = current >= maxScroll - 2;
    }
  }

  function scrollByStep(direction) {
    if (!strip) return;
    const delta = direction === "left" ? -SCROLL_STEP : SCROLL_STEP;
    strip.scrollBy({ left: delta, behavior: "smooth" });
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", () => scrollByStep("left"));
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => scrollByStep("right"));
  }

  if (strip) {
    strip.addEventListener("scroll", () => {
      // debounce leve via requestAnimationFrame
      window.requestAnimationFrame(updateArrowState);
    });
    // estado inicial
    updateArrowState();
  }
}

