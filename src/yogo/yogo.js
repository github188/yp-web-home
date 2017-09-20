$(document).ready(function() {
  var $exampleNav = $('#example-nav');
  var $exampleImages = $('.example-wrapper li');
  $exampleNav.on('mouseover', 'li', function(e) {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $exampleImages.eq(index).addClass('active').siblings().removeClass('active');
  })
  $('.btn-apply').on('click', function(e) {
    window.scrollTo(0, $('body').height() - $(window).height());
  })
})
