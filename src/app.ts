import { App } from '@slack/bolt';
import { config } from 'dotenv';
import _debug from 'debug';
import connection from './util/connection';

const debug = _debug('bot');

if (process.env.NODE_ENV !== 'production') {
  config();
}

const app:App = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// Give every listener MongoDB access
app.use(async ({ next }) => {
  await connection();
  if (next) await next();
});

// Listens to incoming messages that contain "hello"
app.message('hello123', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  const port = process.env.PORT || 3000;

  debug('Boot sequence initiated...');

  await connection();

  // Start the app
  await app.start(port);
  debug('🤖 Boot sequence complete!');
})();
