import type { IDonutSetup } from '../models/setup';
import type { PrefixFunction } from '../../../util/plugin';

export default (pre: PrefixFunction, model: IDonutSetup) => ({
  type: 'modal' as 'modal' || 'home',
  title: {
    type: 'plain_text' as 'plain_text',
    text: 'We ♥ Donut Dates 🍩',
    emoji: true,
  },
  submit: {
    type: 'plain_text' as 'plain_text',
    text: 'Submit',
  },
  close: {
    type: 'plain_text' as 'plain_text',
    text: 'Cancel',
  },
  blocks: [
    {
      type: 'input',
      element: {
        type: 'radio_buttons',
        block_id: 'interval',
        action_id: pre('setup_interval'),
        initial_option: {
          text: {
            type: 'plain_text',
            text: (() => {
              switch (model.weekInterval) {
                case 1:
                  return '1️⃣ week';
                case 4:
                  return '4️⃣ weeks';
                default:
                  return '2️⃣ weeks';
              }
            })(),
            emoji: true,
          },
          value: `w${model.weekInterval}`,
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: '1️⃣ week',
              emoji: true,
            },
            value: 'w1',
          },
          {
            text: {
              type: 'plain_text',
              text: '2️⃣ weeks',
              emoji: true,
            },
            value: 'w2',
          },
          {
            text: {
              type: 'plain_text',
              text: '4️⃣ weeks',
              emoji: true,
            },
            value: 'w4',
          },
        ],
      },
      label: {
        type: 'plain_text',
        text: '📆 Pairing interval',
        emoji: true,
      },
    },
    ...(function* populate() {
      for (let i = 0; i < model.groupCount; i += 1) {
        const input = {
          type: 'input',
          element: {
            type: 'plain_text_input',
            block_id: `g${i}`,
            action_id: pre(`setup_g${i}`),
          },
          label: {
            type: 'plain_text',
            text: `Group ${i + 1}`,
          },
        };
        yield input;
      }
      return [1, 2, 3];
    }()),
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Add as many groups as you want! No limits 😈',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: '➕ Add Group',
          emoji: true,
        },
        action_id: pre('setup_add'),
      },
    },
  ],
});
