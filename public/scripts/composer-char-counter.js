$(document).ready(function() {

  //updates the character count in the new tweet section
  $("#tweet-text").on("keyup", function() {
    let charCount = 140;
    const pressedKey = $(this).val().length;
    charCount -= pressedKey;
    $(this).parent().children().find(".counter").text(charCount);
    if (charCount < 0) {
      $(this).parent().children().find(".counter").addClass("red");
    }
  });
});


