// ===== Mobile menu =====
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "Close" : "Menu";
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  links.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
  menuBtn.textContent = "Menu";
}));

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

document.getElementById("year").textContent = new Date().getFullYear();
