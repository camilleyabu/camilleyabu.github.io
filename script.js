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
document.querySelectorAll("#projects .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#projects .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".project").forEach((p) => {
      p.classList.toggle("hidden", f !== "all" && p.dataset.cat !== f);
    });
  });
});


// ===== Experience tabs =====
document.querySelectorAll(".exp-tabs .chip").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".exp-tabs .chip").forEach((t) => t.classList.toggle("active", t === tab));
    document.querySelectorAll(".exp-panel").forEach((p) => p.classList.toggle("active", p.dataset.panel === tab.dataset.tab));
  });
});
document.querySelectorAll(".exp-panel").forEach((panel) => {
  const items = panel.querySelectorAll(".exp-item");
  const cards = panel.querySelectorAll(".exp-card");
  items.forEach((item) => item.addEventListener("click", () => {
    items.forEach((i) => i.classList.toggle("active", i === item));
    cards.forEach((c) => c.classList.toggle("active", c.dataset.i === item.dataset.i));
  }));
});

// ===== Skills: filter by source, hover to see where a skill comes from =====
const SOURCES = {sierra:"Sierra Space",recat:"ReCat",handshake:"Handshake",algoverse:"Algoverse",projects:"Projects",courses:"Coursework"};
const skills = document.querySelectorAll(".skill");
const caption = document.querySelector(".skill-caption");
let activeSrc = "all";
function describe(el) {
  const from = el.dataset.from.split(" ").filter(Boolean).map((s) => SOURCES[s]);
  caption.innerHTML = `<b>${el.textContent}</b> · ${from.length ? from.join(" · ") : "also in my toolkit"}`;
}
skills.forEach((el) => {
  el.addEventListener("pointerenter", () => describe(el));
  el.addEventListener("focus", () => describe(el));
  el.addEventListener("pointerleave", () => { caption.innerHTML = "&nbsp;"; });
});
document.querySelectorAll(".skill-src .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".skill-src .chip").forEach((c) => c.classList.toggle("active", c === chip));
    activeSrc = chip.dataset.src;
    skills.forEach((el) => {
      const on = activeSrc === "all" || el.dataset.from.split(" ").includes(activeSrc);
      el.classList.toggle("dim", !on);
      el.classList.toggle("hit", on && activeSrc !== "all");
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
