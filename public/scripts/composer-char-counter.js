$(function() {
  $(".tweet-area").on("input", function() {
    const max = 140;
    // search for anything in the parent element (form) with the class "counter"
    const $counter = $(this).parent().find("#counter");
    const count = $(".tweet-area").val().length;
    const remaining = max - count;
    $counter.text(remaining);
    if (remaining < 0) {
      $counter.addClass("error");
    } else {
      $counter.removeClass("error");
    }
  });
})