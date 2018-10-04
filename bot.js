console.log('The bot is starting ');

const Twit = require('twit');
const config = require('./config');
const tweet = new Twit(config);

// Settig up a user stream
const stream = tweet.stream('user');

// Anytime Someone follows me
 stream.on('follow', followed);

function followed(eventMsg)
{
  console.log('Follow event!');
  const name = eventMsg.source.name;
  const screenName = eventMsg.source.screen_name;
// delay response so it doesn't seem like a bot...
  setTimeout(() => {
    console.log("Direct Message sent");
     tweet.post("direct_messages/new", {
      screen_name: screenName,
      text: ` Thanks for following ${screenName}! `
     });
  }, 1000*10);  // will respond via direct message 10 seconds after a user follows.
};
