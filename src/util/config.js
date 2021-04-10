import { config } from 'dotenv';

/**
 * A place to put secrets, envvars, and other project configuration.
 */

if (process.env.NODE_ENV !== 'production') config();

export default {
  dbUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/bog-bot',
  dbName: 'slack-bot',
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  port: process.env.PORT || 3000,
};
