$(function() {
  const max = 140;
  $(".tweet-area").keyup(() => {
    // $(".error").text('');
    const count = $(".tweet-area").val().length;
    const remaining = max - count;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
})