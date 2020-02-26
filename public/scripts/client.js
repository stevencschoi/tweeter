// convert user input into "safe" text for rendering
const escape = str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = data => {
// grab data from inputs
  const { name, avatars, handle } = data.user;
  const { text } = data.content;
  // 60,000 milliseconds in a minute --- assuming date.created_at is the time created from 1970 in milliseconds
  const dateCreated = data.created_at;
  const dateInMinutes = (Date.now() - dateCreated) / 60000;
  const dateInHours = dateInMinutes / 60;
  const dateInDays = (dateInHours / 24).toFixed(0);
  const dateInYears = dateInDays / 365;

  let $tweet = `
    <article class="tweet">
      <header>
        <div>
          <img src=${escape(avatars)} alt="profile picture">
          <h3>${escape(name)}</h3>
        </div>
        <h4>${escape(handle)}</h4>
      </header>
      <p>${escape(text)}</p>
      <footer>
        <h5>${dateInDays} days ago</h5>
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

const renderTweets = tweets => {
  //separating tweets into array and then join to limit page rendering performance issues
  const markupArray = [];
  for (const tweet of tweets) {
    const tweetEl = createTweetElement(tweet);
    markupArray.push(tweetEl);
  }
  markupArray.join("");
  // takes return value and appends it to the tweets container
  $(".tweets-container").append(markupArray);
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(() => {
  $('form').on('submit', event => {
    event.preventDefault();
    console.log('Button clicked, performing ajax call');
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $(this).serialize()
    }).then(tweet => {
      console.log('Success!');
    })
    // .catch(error => {
    //   console.error('Something went wrong!', error);
    // });
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      data: 'JSON'
    })
  };

  renderTweets(data);
});