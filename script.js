const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Theme toggle; remembers the choice for the current browser.
const savedTheme = localStorage.getItem("anshul-portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("anshul-portfolio-theme", root.dataset.theme);
  updateThemeIcon();
});
function updateThemeIcon() {
  const isDark = root.dataset.theme !== "light";
  themeIcon.textContent = isDark ? "☼" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Typing effect.
const typedText = document.getElementById("typedText");
const phrases = ["Java Developer", "Problem Solver", "Software Enthusiast", "Lifelong Learner"];
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);
  let delay = deleting ? 45 : 85;
  if (!deleting && charIndex < phrase.length) charIndex++;
  else if (deleting && charIndex > 0) charIndex--;
  else if (!deleting) { deleting = true; delay = 1200; }
  else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 280; }
  window.setTimeout(typeLoop, delay);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) typeLoop();
else typedText.textContent = "Java Developer";

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));

document.getElementById("year").textContent = new Date().getFullYear();
