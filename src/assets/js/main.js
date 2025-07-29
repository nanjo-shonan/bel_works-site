document.addEventListener('DOMContentLoaded', function () {
    const controller = new ScrollMagic.Controller({
        container: "#scroll-container"
    });

    const scrollContainer = document.querySelector('#scroll-container');
    if (scrollContainer) {
        const sections = scrollContainer.querySelectorAll('section');
        sections.forEach(function (section) {
            new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.8,
                reverse: false
            })
            .setTween(gsap.from(section, { y: 50, autoAlpha: 0, duration: 1 }))
            .addTo(controller);
        });
    }
});