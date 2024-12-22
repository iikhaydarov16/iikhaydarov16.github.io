var swiper = new Swiper(".swiper-banners", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});

$(document).ready(function () {
  const swipers = [];

  $(".swiper-news").each(function (index) {
    const swiper = new Swiper(this, {
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
        600: {
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
    swipers.push(swiper);
  });

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

      const activeIndex = $elTabPane.index();
      if (swipers[activeIndex]) {
        swipers[activeIndex].update();
      }
    }
  };

  $(".tab-btn").on("click", function () {
    showTab(this);
  });
});

$(document).ready(function () {
  const swiperContainer = document.querySelector('.swiper-banners');

  if (swiperContainer) {
      const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

      if (swiperWrapper) {
          const observer = new MutationObserver(() => {
              const activeSlide = document.querySelector('.swiper-slide-active');
          
              if (activeSlide && activeSlide.classList.contains('light')) {
                  swiperContainer.classList.add('light');
              } else {
                  swiperContainer.classList.remove('light');
              }
          });

          observer.observe(swiperWrapper, {
              attributes: true,
              subtree: true,
              attributeFilter: ['class'],
          });
      } 
  } 
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

if (typeof ymaps !== "undefined") {
  ymaps.ready(function () {
    let defaultCenter = [55.760160, 37.608244];
    let mobileCenter = [55.16043706952579, 61.4262959999999];
    let center = defaultCenter;

    function init() {
      let mapContainer = document.getElementById("ymaps");

      if (window.innerWidth < 768) {
        center = mobileCenter;
      } else {
        center = defaultCenter;
      }

      if (mapContainer) {
        let map = new ymaps.Map("ymaps", {
          center: center,
          zoom: 5,
        });

        let addresses = document.querySelectorAll('.address');
        
        addresses.forEach(function(addressElement) {
          let address = addressElement.getAttribute('data-address');

          ymaps.geocode(address).then(function(res) {
            let coordinates = res.geoObjects.get(0).geometry.getCoordinates();

            let placemark = new ymaps.Placemark(coordinates, {}, {
              iconLayout: "default#image",
              iconImageHref: "/wp-content/themes/oilan/assets/images/placemark.svg",
              iconImageSize: [40, 40],
              iconImageOffset: [-19, -44],
            });

            map.geoObjects.add(placemark);
          });
        });

        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        map.controls.remove("zoomControl");
        map.controls.remove("rulerControl");

        window.addEventListener('resize', function() {
          let newCenter = (window.innerWidth < 768) ? mobileCenter : defaultCenter;
          
          if (map.getCenter().toString() !== newCenter.toString()) {
            map.setCenter(newCenter);
          }
        });
      }
    }

    init();
  });
}