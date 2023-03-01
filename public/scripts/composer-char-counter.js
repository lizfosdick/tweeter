$(document).ready(function() {
  console.log("Document is ready");

  //updates the character count in the new tweet section
  $( "#tweet-text" ).on("keyup", function (event) {
    let charCount = 140;
    const pressedKey = $( this ).val().length;
    charCount -= pressedKey;
    $( this ).parent().children().find(".counter").text(charCount);

      if (charCount < 0) {
        $( this ).parent().children().find(".counter").addClass("red");
      }
    

  });
});


