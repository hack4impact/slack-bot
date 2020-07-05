import { App } from '@slack/bolt';
import _debug from 'debug';
import connection from './util/connection';
import config from './util/config';

const debug = _debug('bot');

const app:App = new App({
  signingSecret: config.slackSigningSecret,
  token: config.slackBotToken,
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
  debug('Boot sequence initiated...');

  await connection();

  // Start the app
  await app.start(config.port);
  debug('🤖 Boot sequence complete!');
})();
