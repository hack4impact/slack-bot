import { App } from '@slack/bolt';
import { config } from 'dotenv';
import _debug from 'debug';

const debug = _debug('bot');

if (process.env.NODE_ENV !== 'production') {
  config();
}

const app:App = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  debug('⚡️ Bolt app is running!');
})();
