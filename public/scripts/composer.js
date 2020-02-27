$(() => {
  // stretch toggle button to display new tweet form and scroll up
  $('.toggle').on('click', () => {
    $('.new-tweet-form').slideDown('slow', resetElements);
    scrollToTop();
    $('.toggle').addClass('invisible');
  });

  // listening for scroll on window
  window.onscroll = function() {
    showWhichButton();
  };
  
  // if the user scrolls down 50px from the top of the document, hide compose button and show toggle button
  const showWhichButton = () => {
    // accounting for differences in browser compatibility
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      $('.compose').addClass('invisible');
      $('.toggle').removeClass('invisible');
    } else {
      $('.compose').removeClass('invisible');
      $('.toggle').addClass('invisible');
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
});