/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const $tweet = $("<article>").addClass("tweet");
  const $tweetHeader = $("<header>");
  const $divLeftHeader = $("<div>").addClass("left-header");
  const $imgAvatar = $(`<img src='${tweet.user.avatars}'>`).addClass("left-header");
  const $pName = $("<p>").text(tweet.user.name);
  const $divHandleText = $("<div>").addClass("handle-text").text(tweet.user.handle);
  
  const $divTweetText = $("<div>").addClass("tweet-text").text(tweet.content.text);

  const $tweetFooter = $("<footer>");
  const $divFooter = $("<div>").text(tweet.created_at);
  const $divFooterIcons = $("<div>").addClass("footer-icons");
  const $flagIcon = $("<i>").addClass("fa-flag").addClass("fa-solid");
  const $retweetIcon = $("<i>").addClass("fa-retweet").addClass("fa-solid").addClass("fa-sharp");
  const $heartIcon = $("<i>").addClass("fa-heart").addClass("fa-solid");
 
  
  $tweet.append($tweetHeader);

  //tweet header
  $tweetHeader.append($divLeftHeader);
  $divLeftHeader.append($imgAvatar);
  $divLeftHeader.append($pName);
  $tweetHeader.append($divHandleText);

  //tweet text
  $tweet.append($divTweetText);

  //tweet footer
  $tweet.append($tweetFooter);
  $tweetFooter.append($divFooter);
  $tweetFooter.append($divFooterIcons);
  $divFooterIcons.append($flagIcon);
  $divFooterIcons.append($retweetIcon);
  $divFooterIcons.append($heartIcon);


  $('#all-tweets').append($tweet); 
  return $tweet;
}

$(document).ready(function() {
  console.log("Document - clientjs - is ready");
  const newTweet = createTweetElement(tweetData);
});


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};
