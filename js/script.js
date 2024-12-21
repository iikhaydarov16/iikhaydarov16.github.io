var swiper = new Swiper(".swiper-banners", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});

var swiper = new Swiper('.swiper-news', {
  slidesPerView: '6',
  spaceBetween: 8,
  mousewheel: true,  
  freeMode: true,
  breakpoints: {
    1324: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 5.3,
    },
    600:{
      slidesPerView: 2.3,
    },
    320: {
      slidesPerView: 1.3,
    },
  },
  scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
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

$(document).ready(function() {
  const showTab = (elTabBtn) => {
    const $elTab = $(elTabBtn).closest(".news-tabs");
    if ($(elTabBtn).hasClass("tab-btn-active")) {
      return;
    }

    const targetId = $(elTabBtn).data("targetId");
    const $elTabPane = $elTab.find(`.tab-pane[data-id="${targetId}"]`);

    if ($elTabPane.length) {
      const $elTabBtnActive = $elTab.find(".tab-btn-active");
      const $elTabPaneShow = $elTab.find(".tab-pane-show");

      $elTabBtnActive.removeClass("tab-btn-active");
      $elTabPaneShow.removeClass("tab-pane-show");

      $(elTabBtn).addClass("tab-btn-active");
      $elTabPane.addClass("tab-pane-show");
    }
  };

  $(".tab-btn").on("click", function() {
    showTab(this);
  });
});

