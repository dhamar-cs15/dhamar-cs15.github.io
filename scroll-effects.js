// Underline headings/text when they enter the viewport
(function() {
    const targets = document.querySelectorAll('.underline-on-scroll');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(t => observer.observe(t));
})();
