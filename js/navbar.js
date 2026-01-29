document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Prevent negative scrolling (safari bounce)
        if (scrollTop < 0) return;

        if (scrollTop > lastScrollTop) {
            // Scrolling DOWN
            navbar.classList.remove('visible');
        } else {
            // Scrolling UP
            navbar.classList.add('visible');
        }

        lastScrollTop = scrollTop;
    });
});
