// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Confetti burst on load
(function confetti() {
  const colors = ['#a855f7', '#c084fc', '#7c3aed', '#e879f9', '#ffffff'];
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 100,
    r: 3 + Math.random() * 5,
    d: 2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: 0.05 + Math.random() * 0.1,
    opacity: 1,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    particles.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.y += p.d;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      p.opacity = Math.max(0, 1 - p.y / (canvas.height * 0.85));
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x + p.tilt, p.y, p.r * 0.6, p.r, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    if (frame < 180) requestAnimationFrame(draw);
    else canvas.remove();
  }
  setTimeout(draw, 300);
})();
