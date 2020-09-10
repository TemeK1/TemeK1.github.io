$(document).ready(function(){
$('.header').height($(window).height());
  let show = true;
  $('.hide').on('mouseup', function() {
    if (show === true) {
      $('.courseDiv').removeClass('hidden');
      show = false;
    } else {
      $('.courseDiv').addClass('hidden');
      show = true;
    }
  });

  $('.hideFrameButton').on('mouseup', (e) => {
    $('.iframe').addClass('hidden');
    $('.hideFrameButton').addClass('hideFrame');
  });

  $('.clickToFrame').on('mouseup', (e) => {
    $('.iframe').removeClass('hidden');
    if ($('.frame1').length >= 1)  {
      $('.frame1').attr('src', 'https://www.teemukapyla.fi/' + e.target.getAttribute('id'));
      $('.hideFrameButton').removeClass('hideFrame');
    } else {
      $('<iframe>', {
       src: 'https://www.teemukapyla.fi/' + e.target.getAttribute('id'),
       class: 'frame1',
       id:  'myFrame',
       frameborder: 0
     }).appendTo('.iframe');
     $('.hideFrameButton').removeClass('hideFrame');
    }
    });

    let href = window.location.href.split('#');

    if (href.length <= 1) return;
    if (((href[1]).localeCompare("mailSent")) == 0) {
      $('#sentConfirmed').removeClass('hidden');
      $('#contact2').addClass('hidden');
    }
    
})

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 99);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});