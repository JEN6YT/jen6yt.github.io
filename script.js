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