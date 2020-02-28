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
  const dateInMinutes = ((Date.now() - dateCreated) / 60000).toFixed(0);
  const dateInHours = (dateInMinutes / 60).toFixed(0);
  const dateInDays = (dateInHours / 24).toFixed(0);
  const dateInMonths = (dateInDays / 30).toFixed(0);

  let dateString = '';
  // const dateInYears = dateInDays / 365;
  if (dateInMinutes < 1) {
    dateString = 'A few seconds ago';
    // 60 seconds in a minute
  } else if (dateInMinutes < 60) {
    dateString = `${dateInMinutes} minutes ago`;
    // less than 2 hours = about an hour ago because math
  } else if (dateInMinutes < 120) {
    dateString = 'About an hour ago';
    // math continues...
  } else if (dateInMinutes < 1440) {
    dateString = `${dateInHours} hours ago`;
  } else if (dateInMinutes < 43200) {
    dateString = `${dateInDays} days ago`;
    // less than 2 months = over a month
  } else if (dateInMinutes < 86400) {
    dateString = 'Over a month ago';
  } else if (dateInMinutes <= 518400) {
    dateString = `${dateInMonths} months ago`;
  } else {
    dateString = 'Over a year ago';
  }

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
        <h5>${dateString}</h5>
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
  // clear out array before re-loading data
  $('.tweets-container').empty();
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

// data validation function
const isTweetValid = (tweetText) => {
  const invalid = ["", null];
  if (tweetText.length > 140) {
    return 'Text exceeds the character limit!';
  }
  // verification if tweetText is only whitespace
  if (invalid.includes(tweetText) || tweetText.trim() < 2) {
    return 'Text input is empty!';
  }
  return true;
};

// reset page elements
const resetElements = () => {
  $('form')[0].reset();
  $('#counter').text(140).removeClass('error');
  $('.error-div').slideUp('slow');
};

// <-------- document ready -------->
$(() => {
  // display new tweet form on button
  $('.compose').on('click', () => {
    $('.new-tweet-form').slideToggle('slow', resetElements);
    // move cursor to form text area
    if ($('.new-tweet-form').is(":visible")) {
      $('.tweet-area').focus();
    }
  });

  // post tweet to database & add to body
  $('form').on('submit', event => {
    event.preventDefault();
    let tweetText = $('.tweet-area').val();
    // sliding up the error window to wipe any existing error messages, then proceed with validation inside anonymous fn
    $('.error-div').slideUp('slow', () => {
      // data validation
      const error = isTweetValid(tweetText);
      if (error !== true) {
        // display errors on screen
        $('.input-error').text(error);
        $('.error-div').slideDown('slow');
        return;
      }
      // ajax call
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $('form').serialize()
      }).then(() => {
        loadTweets();
      }).catch(() => {
        $('.input-error').text('Something went wrong!');
        $('.error-div').slideDown('slow');
      });
      //reset form on submission
      resetElements();
    });
  });
  
  // load tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'JSON'
    }).then(result => {
      renderTweets(result);
    }).catch(error => {
      console.error('Something went wrong!', error);
    });
  };

  loadTweets();
});