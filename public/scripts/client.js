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
    markupArray.unshift(tweetEl);
  }
  markupArray.join("");
  // takes return value and appends it to the tweets container
  $(".tweets-container").prepend(markupArray);
};

$(() => {
  $('form').on('submit', event => {
    event.preventDefault();
    const tweetText = $('.tweet-area').val();
    // data validation
    const error = isTweetValid(tweetText);
    if (error !== true) {
      alert(error);
      return;
    }

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $('form').serialize()
    }).then(() => {
      console.log('Success!');
      loadTweets();
    }).catch(error => {
      console.error('Something went wrong!', error);
    });
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'JSON'
    }).then(result => {
      renderTweets(result);
    })
    // .catch(error => {
    //   const errorMsg = tweetError(tweet)
    //   console.log('Something went wrong!', error);
    // });
  };

  // data validation
  const isTweetValid = (tweetText) => {
    const invalid = ["", null];
    if (tweetText.length > 140) {
      return 'Your tweet exceeds the character limit!';
    }
    if (invalid.includes(tweetText)) {
      return "You haven't entered anything!";
    }
    return true;
  };
});