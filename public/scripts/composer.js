$(() => {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.toggle').fadeIn();
      $('.compose').fadeOut();
    } else {
      $('.toggle').fadeOut();
      $('.compose').fadeIn();
    }
  });

  // When the user clicks on the button, scroll to the top of the document
  $('.toggle').click(() => {
    $('.new-tweet-form').slideDown();
    $('html, .tweet-area').animate({scrollTop : 0}, 500).focus();
  });
});