/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  console.log("Document - clientjs - is ready");

  $("#error").hide();

//takes in a tweet object and returns a tweet <article> element
const createTweetElement = function(tweet) {
  

  const $tweet = $("<article>").addClass("tweet");
  //header variables
  const $tweetHeader = $("<header>");
  const $divLeftHeader = $("<div>").addClass("left-header");
  const $imgAvatar = $(`<img src='${tweet.user.avatars}'>`).addClass("left-header");
  const $pName = $("<p>").text(tweet.user.name);
  const $divHandleText = $("<div>").addClass("handle-text").text(tweet.user.handle);
  
  //tweet text variables
  const $divTweetText = $("<div>").addClass("tweet-text").text(tweet.content.text);

  const date = new Date(tweet.created_at)
  //tweet footer variables
  const $tweetFooter = $("<footer>");
  const $divFooter = $("<div>").html(timeago.format(date));
  const $divFooterIcons = $("<div>").addClass("footer-icons");
  const $flagIcon = $("<i>").addClass("fa-flag").addClass("fa-solid");
  const $retweetIcon = $("<i>").addClass("fa-retweet").addClass("fa-solid").addClass("fa-sharp");
  const $heartIcon = $("<i>").addClass("fa-heart").addClass("fa-solid");
 
  
  $tweet.append($tweetHeader);

  //appending to the tweet header
  $tweetHeader.append($divLeftHeader);
  $divLeftHeader.append($imgAvatar);
  $divLeftHeader.append($pName);
  $tweetHeader.append($divHandleText);

  //appending the tweet text
  $tweet.append($divTweetText);

  //appending to the tweet footer
  $tweet.append($tweetFooter);
  $tweetFooter.append($divFooter);
  $tweetFooter.append($divFooterIcons);
  $divFooterIcons.append($flagIcon);
  $divFooterIcons.append($retweetIcon);
  $divFooterIcons.append($heartIcon);

  return $tweet;
}

//renders all the tweets in the database
const renderTweets = function(tweets) {
  $("#all-tweets-container").empty();
  for (let singleTweet of tweets) {
    const newTweet = createTweetElement(singleTweet);
    $('#all-tweets-container').prepend(newTweet);
  }
  //return;
};

  //requests /tweets and receives array of tweets as JSON
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (response) => {
        renderTweets(response);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
 

  $( "#tweet-form" ).submit(function( event ) {
    console.log("Handler for .submit() called")

    

    event.preventDefault();
    if ($( "#tweet-text" ).val() === "") {
      $("#error").text("⚠️Tweet cannot be empty.⚠️").slideDown('slow').delay(2500).slideUp('slow');
      return;
    } else if ($( "#tweet-text").val().length> 140) {
      $("#error").text("Too many characters! Please shorten your tweet.✏️").slideDown('slow').delay(2500).slideUp('slow');
        return;
      } else {
       // $.post( "/tweets", $( this ).serialize() );
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: $( this ).serialize(),
          // success: (response) => {
          //   renderTweets(response);
          // },
          // error: (err) => {
          //   console.log(err)
          // }
        
        }).then((result) => {
          loadTweets();
          $('#tweet-text').val("");
          $('.counter').val(140);
        })
        
      }
    
   
    
  })
  loadTweets();
});





