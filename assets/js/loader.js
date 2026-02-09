function introAnimation() {
    const loader = document.getElementById("main-loader");

    // Slide text upward
    loader.classList.add('loaded');

    console.log('calling timeout');
    // After slide finishes, fade intro and reveal content
    setTimeout(() => {
        document.getElementById("hero-content").classList.add('loaded');
        console.log('called callback');
        document.body.style.overflow = "auto";
    }, 1200);
}

const start = Date.now();

window.addEventListener("load", () => {
    console.log('added event');

    const elapsed = Date.now() - start;
    const delay = Math.max(1200 - elapsed, 0);

    setTimeout(() => {
        document.getElementById('hero-logo-sub').style.opacity = '1';
    }, 200);

    setTimeout(introAnimation, delay);
});