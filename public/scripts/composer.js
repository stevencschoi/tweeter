$(() => {
  // second toggle button to display new tweet form and scroll up
  $('.toggle').on('click', () => {
    $('.new-tweet-form').slideDown('slow', resetElements);
    scrollToTop();
  });

  const headerButton = document.getElementsByClassName('.compose');
  const bottomButton = document.getElementsByClassName('.toggle');

  const showWhichButton = () => {
    // accounting for differences in browser compatibility
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      headerButton.hide();
      bottomButton.show();
    } else {
      headerButton.show();
      bottomButton.hide();
    }
  }

   // When the user clicks on the button, scroll to the top of the document
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});