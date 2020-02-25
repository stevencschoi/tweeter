/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


  const createTweetElement = data => {
  // grab data from inputs
  const { name, avatar, handle } = data.user;
  const { text } = data.content;
  const dateInMinutes = (Date.now() - data.created_at)/ 60000;
  const dateInHours = dateInMinutes / 60;
  const dateInDays = dateInHours / 24;

  // 60,000 milliseconds in a minute

  console.log(dateInMinutes);
  console.log(dateInHours);
  console.log(dateInDays);


  let $tweet = `
    <article class="tweet">
    <header>
      <div>
        <img src=${escape(avatar)} alt="profile picture">
        <h3>${escape(name)}</h3>
      </div>
      <h4>${escape(handle)}</h4>
    </header>
    <p>${escape(text)}</p>
    <footer>
      <h5>${dateInHours} days ago</h5>
      <div class="icons">
        <a href="#"><i class="fas fa-flag"></i></a>
        <a href="#" class=""><i class="fas fa-retweet"></i></a>
        <a href="#"><i class="fas fa-heart"></i></a>
      </div>
    </footer>
    <div class="handle">
    </div>
    </article>`;
    return $tweet;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
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
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

$(function() {
  $('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});