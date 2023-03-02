/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



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

  //tweet footer variables
  const $tweetFooter = $("<footer>");
  const $divFooter = $("<div>").text(tweet.created_at);
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


  //$('#all-tweets-container').append($tweet); 
  return $tweet;
}


const renderTweets = function(tweets) {
  for (let singleTweet of tweets) {
    const newTweet = createTweetElement(singleTweet);
    $('#all-tweets-container').prepend(newTweet);
  }
  return;
};

$(document).ready(function() {
  console.log("Document - clientjs - is ready");

  $( "#tweet-form" ).submit(function( event ) {
    console.log("Handler for .submit() called")
    event.preventDefault();
    $.post( "/tweets", $( this ).serialize() );
  })

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (response) => {
        renderTweets(response);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  loadTweets();
});




