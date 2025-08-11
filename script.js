// Finds every element with the data-link attribute, giving a list of the menu links.
const links = document.querySelectorAll('a[data-link]');
const sections = document.querySelectorAll('main > section');

function update_year(){
    document.getElementById("year").innerHTML = new Date().getFullYear();
}

// Update the year in the footer
update_year();

function loadPage(id){
    // Loop through each section
    sections.forEach(section => {
        // If the id of the section matches the id passed to the function
        if(section.id === id){
            // Show the section
            section.style.display = 'block';
        } else {
            // Hide the section
            section.style.display = 'none';
        }
    });
    // Loop through each link
    links.forEach(link => {
        // If the href of the link matches the id passed to the function
        if(link.getAttribute('href').substring(1) === id){
            // Add the active class to the link
            link.classList.add('active');
        } else {
            // Remove the active class from the link
            link.classList.remove('active');
        }
    });
    document.title = `Jennifer Zhang · ${id.charAt(0).toUpperCase()+id.slice(1)}`;
}

// For each link, add an event listener to it.
links.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent the page from reloading
        event.preventDefault();
        // Get the href attribute of the link
        const href = this.getAttribute('href').substring(1);
        // Load the content of the page into the main element
        loadPage(href);
        // Update the URL in the address bar without reloading the page
        history.pushState(null, '', `#${href}`);
    });
});

// Load the initial page based on the URL hash
const initialPage = location.hash.replace('#', '') || 'about';
loadPage(initialPage);

// Handle the back and forward buttons
window.addEventListener('popstate', function() {
    const hash = location.hash.replace('#', '') || 'about';
    loadPage(hash);
}
);

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
    // Mobile menu toggle functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Your existing CV navigation code
    const cvNavLinks = document.querySelectorAll('#cv .sidebar a[href^="#"]');
    const cvSections = document.querySelectorAll('#cv .cv-content section[id]');
  
    function highlightCvLink() {
      const marker = window.scrollY + window.innerHeight * 0.3;
      cvSections.forEach(sec => {
        const top     = sec.offsetTop;
        const bottom  = top + sec.offsetHeight;
        const isActive = marker >= top && marker < bottom;
        const id      = sec.id;
  
        cvNavLinks.forEach(link => {
          link.classList.toggle(
            'active',
            isActive && link.getAttribute('href') === `#${id}`
          );
        });
      });
    }
  
    window.addEventListener('scroll', highlightCvLink);
    window.addEventListener('load',   highlightCvLink);
  
    cvNavLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
  
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) {
          console.warn(`No element with id="${targetId}"`);
          return;
        }
  
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${targetId}`);
  
        cvNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
});
  
