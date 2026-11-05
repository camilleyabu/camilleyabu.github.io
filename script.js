// ===== Theme toggle (dark by default, choice remembered) =====
const root = document.documentElement;
document.querySelector(".theme-btn").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ===== Mobile menu =====
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
function setMenu(open) {
  links.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "Close" : "Menu";
}
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Project filters =====
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".project").forEach((p) => {
      p.classList.toggle("hidden", f !== "all" && p.dataset.cat !== f);
    });
  });
});

// ===== Videos: click a thumbnail to play it in place =====
document.querySelectorAll(".vid").forEach((btn) => {
  btn.addEventListener("click", () => {
    const thumb = btn.querySelector(".thumb");
    if (thumb.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube.com/embed/${btn.dataset.id}?autoplay=1`;
    f.title = btn.querySelector(".vid-title").textContent;
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    thumb.replaceChildren(f);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
