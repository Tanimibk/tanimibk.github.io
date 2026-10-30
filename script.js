// Theme toggle (remembers choice)
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
document.querySelector('.theme-btn').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Mobile menu: open/close, close on link tap or outside tap
const menuBtn = document.querySelector('.menu-btn');
const links = document.getElementById('menu');
const setMenu = open => { links.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); };
menuBtn.addEventListener('click', e => { e.stopPropagation(); setMenu(!links.classList.contains('open')); });
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => { if (!links.contains(e.target)) setMenu(false); });

// Highlight the section in view
const navLinks = [...links.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Publication filters
document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === chip));
  const f = chip.dataset.filter;
  document.querySelectorAll('.pubs li').forEach(li => li.classList.toggle('hidden', f !== 'all' && li.dataset.kind !== f));
}));

// Fade sections in on scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.06 });
document.querySelectorAll('.section').forEach(s => { s.classList.add('reveal'); io.observe(s); });

document.getElementById('yr').textContent = new Date().getFullYear();
