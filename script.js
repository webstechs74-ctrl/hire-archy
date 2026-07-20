// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('mainNav');
const headerCta = document.querySelector('.header-cta');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  headerCta.classList.toggle('open');
});

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Animated counters
const stats = document.querySelectorAll('.stat');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const numEl = el.querySelector('.num');
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        numEl.textContent = current;
      }, 25);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
stats.forEach(el => statObserver.observe(el));

// Search form
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
});

// Job carousel arrows (simple horizontal scroll on small screens / reorder on desktop)
const jobsGrid = document.getElementById('jobsGrid');
document.getElementById('jobNext').addEventListener('click', () => {
  jobsGrid.appendChild(jobsGrid.firstElementChild);
});
document.getElementById('jobPrev').addEventListener('click', () => {
  jobsGrid.insertBefore(jobsGrid.lastElementChild, jobsGrid.firstElementChild);
});

// Testimonial dots (visual only, single pair shown)
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// Newsletter submit feedback
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Subscribed ✓';
  setTimeout(() => btn.textContent = original, 2200);
  e.target.reset();
});
