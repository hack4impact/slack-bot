//Carsen
import { App } from '@slack/bolt';
import _debug from 'debug';
import db from './util/db';
import config from './util/config';
import loadPlugins from './util/plugin';

const debug = _debug('bot');

const app = new App({
  signingSecret: config.slackSigningSecret,
  token: config.slackBotToken,
});

(async () => {
  debug('Boot sequence initiated...');

  await db();
  await loadPlugins(app);
  await app.start(config.port);

  debug('🤖 Boot sequence complete!');
})();
