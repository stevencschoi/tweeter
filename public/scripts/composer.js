$(function() {
  // stretch toggle button to display new tweet form and scroll up
  const headerButton = document.getElementsByClassName('.compose');
  const bottomButton = document.getElementsByClassName('.toggle');

  $('.toggle').on('click', () => {
    $('.new-tweet-form').slideDown('slow', resetElements);
    scrollToTop();
    // $('.toggle').addClass('invisible');
  });

  window.onscroll = function() { showWhichButton() };
  
  // When the user scrolls down 20px from the top of the document, show the button
  const showWhichButton = () => {
    // accounting for differences in browser compatibility
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      headerButton.addClass('invisible');
      bottomButton.removeClass('invisible');
    } else {
      headerButton.removeClass('invisible');
      bottomButton.addClass('invisible');
    }
  }

   // When the user clicks on the button, scroll to the top of the document
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});