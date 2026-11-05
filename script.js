// ===== DNA helix in the hero (reacts to your cursor) =====
const canvas = document.getElementById("helix");
const ctx = canvas.getContext("2d");
const colors = ["#ff4d8d", "#3d7bff", "#c8f53b", "#ff9a1f", "#8a3ffc"];
let W, H, mouse = { x: 0.5, y: 0.5 };

function resize() {
  const dpr = window.devicePixelRatio || 1;
  W = canvas.clientWidth; H = canvas.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

document.querySelector(".hero").addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - r.left) / r.width;
  mouse.y = (e.clientY - r.top) / r.height;
});

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function drawHelix(t) {
  ctx.clearRect(0, 0, W, H);
  const rungs = Math.floor(W / 28);
  const centerY = H * (0.3 + mouse.y * 0.4);
  const amp = Math.min(H * 0.22, 160) * (0.6 + mouse.x * 0.8);
  const speed = t * 0.0012;

  for (let i = 0; i <= rungs; i++) {
    const x = (i / rungs) * W;
    const phase = i * 0.32 + speed;
    const y1 = centerY + Math.sin(phase) * amp;
    const y2 = centerY + Math.sin(phase + Math.PI) * amp;
    const depth = (Math.cos(phase) + 1) / 2; // 0 back, 1 front

    // rung
    ctx.strokeStyle = `rgba(27,16,53,${0.08 + depth * 0.15})`;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();

    // nucleotides
    const c = colors[i % colors.length];
    dot(x, y1, 5 + depth * 6, c, 0.35 + depth * 0.6);
    dot(x, y2, 5 + (1 - depth) * 6, colors[(i + 2) % colors.length], 0.35 + (1 - depth) * 0.6);
  }
  if (!reduced) requestAnimationFrame(drawHelix);
}
function dot(x, y, r, color, a) {
  ctx.globalAlpha = a;
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1b1035"; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.globalAlpha = 1;
}
requestAnimationFrame(drawHelix);

// ===== Cursor dot =====
const cur = document.querySelector(".cursor-dot");
window.addEventListener("pointermove", (e) => {
  cur.style.opacity = 1;
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
});
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("pointerenter", () => { cur.style.width = cur.style.height = "42px"; });
  el.addEventListener("pointerleave", () => { cur.style.width = cur.style.height = "18px"; });
});

// ===== Mobile menu =====
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
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

// ===== Tilt cards =====
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    card.style.boxShadow = "10px 10px 0 #1b1035";
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; card.style.boxShadow = ""; });
});

document.getElementById("year").textContent = new Date().getFullYear();
