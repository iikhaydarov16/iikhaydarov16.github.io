var swiper = new Swiper(".swiper-banners", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});

$(document).ready(function () {
    const swiperContainer = document.querySelector('.swiper-banners');

    const observer = new MutationObserver(() => {
        const activeSlide = document.querySelector('.swiper-slide-active');
    
        if (activeSlide && activeSlide.classList.contains('light')) {
            swiperContainer.classList.add('light');
        } else {
            swiperContainer.classList.remove('light');
        }
    });

    observer.observe(swiperContainer.querySelector('.swiper-wrapper'), {
        attributes: true,
        subtree: true,
        attributeFilter: ['class'],
    });
});
