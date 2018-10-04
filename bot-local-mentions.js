console.log('The bot has started... ');
let randomString = require('./randomStrings');
let Twit = require('twit');
let config = require('./config');
let T = new Twit(config);

// Settig up a user stream
let stream = T.stream('user');

// Anytime Someone follows me
stream.on('follow', followed);

//  stream and filter twitter for conversation about programming
stream.on('tweet', filterAreaTweets);

// find people talking about coding in our area
function filterAreaTweets(tweetedUser) {
  const buzwords = [
    'learn to code',
    'programming',
    'web development',
    'software development',
    'coding bootcamps',
    'coding bootcamp',
    'Coding bootcamp',
    'Coding Bootcamp',
    'free code camp',
    'coding meetup',
    'coding meetups',
    '100DaysOfCode'
  ];
  //Append Hashtags to buzzwords array of strings
  let hashtags = buzwords.map(words => '#' + words.replace(/\s/gi, ''));
  buzwords.push(hashtags);

  //Search bounding box from merced to Sacramento and bay area
  const centralValley = ['-122.0042', '37.2724', '-119.9999', '39.0659'];

  let stream = T.stream('statuses/filter', {
    //find a match to words in buzwords array
    track: buzwords,

    locations: centralValley
  });

  console.log(tweetedUser.user.screen_name, +' ' + tweetedUser.text);

  setTimeout(function() {
    T.post(
      'statuses/update',
      {
        screen_name: tweetedUser.user.screen_name,
        status:
          randomString +
          ' ' +
          tweetedUser.user.screen_name +
          '! ' +
          ' We have a growing community of Developers in The Modesto Area. Follow us to get more details '
      },
      (err, data, response) => {
        console.log(data);
      }
    );
  }, 5000);
}

function followed(eventMsg) {
  console.log('Follow event!');
  let name = eventMsg.source.name;
  let screenName = eventMsg.source.screen_name;

  // the post request for direct messages > need to add a function to handle errors
  setTimeout(function() {
    // wait 60 sec before sending direct message.
    console.log('Direct Message sent');
    T.post('direct_messages/new', {
      screen_name: screenName,
      text:
        'Thanks for following' +
        ' ' +
        screenName +
        '! ' +
        ' Check out our Facebook page at https://www.facebook.com/groups/free.code.camp.modesto/ We usually meet thursday evenings at 6pm'
    });
  }, 1000 * 30);
}
