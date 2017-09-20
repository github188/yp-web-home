$(document).ready(function() {
  $('.btn-handel').on('click', function(e) {
    window.scrollTo(0, $('body').height() - $(window).height());
  })
})
