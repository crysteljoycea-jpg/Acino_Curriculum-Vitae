document.getElementById('year').textContent = new Date().getFullYear();

const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    toggleBtn.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    toggleBtn.textContent = '🌙';
  }
  localStorage.setItem('cv-theme', theme);
}

const saved = localStorage.getItem('cv-theme') || 'dark';
applyTheme(saved);

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// Animate skill bars once they're on screen
const skillFills = document.querySelectorAll('.skill-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width; // trigger transition
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => observer.observe(el));