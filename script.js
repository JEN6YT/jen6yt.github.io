function update_year(){
    document.getElementById("year").innerHTML = new Date().getFullYear();
}

update_year();
document.title = 'Jennifer Zhang';

// Dark mode toggle
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', function() {
    const dark = document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggle.innerHTML = '&#9728;'; // Sun icon
    } else {
        toggle.innerHTML = '&#9790;'; // Moon icon
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const pageLinks = document.querySelectorAll('.nav-links a[href^="#"], .logo a[href^="#"]');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${targetId}`);
        });
    });

    if (location.hash) {
        const targetEl = document.querySelector(location.hash);
        if (targetEl) {
            requestAnimationFrame(() => {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }
});

document.addEventListener('click', (e) => {
  if (!e.target.matches('.abstract-toggle')) return;
  const details = e.target.closest('details.project-abstract');
  const isOpening = !details.hasAttribute('open');
  e.target.textContent = isOpening ? 'Hide' : 'Read more';
  if (isOpening) details.removeAttribute('data-collapsed');
  else details.setAttribute('data-collapsed','');
});
