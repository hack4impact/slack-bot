import type { App } from '@slack/bolt';
import type { PrefixFunction } from '../../util/plugin';

export default async (app: App, pre: PrefixFunction) => {
  app.shortcut(pre('new'), async ({ shortcut, ack, context, client }) => {
    try {
      await ack();

      await client.views.open({
        token: context.botToken,
        trigger_id: shortcut.trigger_id,
        view: {
          type: 'modal',
          title: {
            type: 'plain_text',
            text: 'My App',
          },
          close: {
            type: 'plain_text',
            text: 'Close',
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>.'
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: 'Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>'
                },
              ],
            },
          ],
        },
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
