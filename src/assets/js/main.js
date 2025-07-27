document.addEventListener('DOMContentLoaded', function () {

    // --- Scroll Animation ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // --- Swiper Slider for Portfolio ---
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // --- Cookie Consent Banner ---
    const consentBanner = document.getElementById('cookie-consent-banner');
    const consentButton = document.getElementById('cookie-consent-button');

    if (consentBanner && consentButton) {
        // Check if consent has already been given
        if (!localStorage.getItem('cookie_consent')) {
            setTimeout(() => {
                consentBanner.classList.remove('hidden');
                setTimeout(() => {
                    consentBanner.classList.remove('translate-y-full');
                }, 100);
            }, 2000);
        }

        consentButton.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'true');
            consentBanner.classList.add('translate-y-full');
            setTimeout(() => {
                consentBanner.classList.add('hidden');
            }, 500);
        });
    }

});
