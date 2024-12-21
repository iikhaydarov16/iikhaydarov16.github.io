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

$(document).ready(function() {
    var currentVideo = null;
  
    $('.play-btn').click(function() {
      var video = $(this).siblings('.video')[0];
  
      if (currentVideo && currentVideo !== video) {
        $(currentVideo).attr('poster', $(currentVideo).data('poster'));
  
        var source = $(currentVideo).find('source').attr('src');
        currentVideo.load();
        $(currentVideo).find('source').attr('src', source);
  
        currentVideo.pause();
        currentVideo.currentTime = 0;
        $(currentVideo).removeAttr('controls');
        $(currentVideo).siblings('.play-btn').show();
      }
  
      $(this).hide();
      video.play();
      video.controls = true;
  
      currentVideo = video;
    });
  
    $('.video').on('pause ended', function() {
      var video = this;
      
      $(video).attr('poster', $(video).data('poster'));
  
      var source = $(video).find('source').attr('src');
      video.load();
      $(video).find('source').attr('src', source);
      video.pause();
  
      $(video).removeAttr('controls');
      $(video).siblings('.play-btn').show();
    });
  });
