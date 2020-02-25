$(function() {
  const max = 140;
  $(".tweet-area").on("input", function() {
    // $(".error").text('');
    const $counter = $(this).parent().find(".counter");
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