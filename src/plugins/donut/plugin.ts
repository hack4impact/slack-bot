import type { App } from '@slack/bolt';
import type { PrefixFunction } from '../../util/plugin';

export default async (app: App, pre: PrefixFunction) => {
  app.message(pre('hello'), async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
  });
};
