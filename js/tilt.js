document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');

    if (!profileImg) return;

    profileImg.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;

        const rect = profileImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = (x / rect.width) - 0.5;
        const yPct = (y / rect.height) - 0.5;

        const maxRotate = 10;

        const rotateY = xPct * 2 * maxRotate;
        const rotateX = -yPct * 2 * maxRotate;

        profileImg.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transition = 'transform 0.5s ease-out';
        profileImg.style.transform = 'scale(1) rotateX(0) rotateY(0)';

        setTimeout(() => {
            profileImg.style.transition = 'transform 0.1s ease-out';
        }, 500);
    });
});
