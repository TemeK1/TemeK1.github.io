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
      $('#mailSent').removeClass('hidden');
      $('#contact2').addClass('hidden');
    }
})
