import type { App } from '@slack/bolt';
import type { PrefixFunction } from '../../util/plugin';

import DonutSetup from './models/setup';
import donutSetupBlock from './blocks/setup';

export default async (app: App, pre: PrefixFunction) => {
  app.shortcut(pre('new'), async ({
    shortcut, ack, context, client,
  }) => {
    try {
      await ack();

      const donutSetup = new DonutSetup();
      await donutSetup.save();

      await client.views.open({
        token: context.botToken,
        trigger_id: shortcut.trigger_id,
        view: donutSetupBlock(pre, donutSetup),
      });
    } catch (e) {
      // TODO
    }
  });

  // app.message(pre('hello'), async ({ message, say }) => {
  //   // say() sends a message to the channel where the event was triggered
  //   await say(`Hey there <@${message.user}>!`);
  // });
};
