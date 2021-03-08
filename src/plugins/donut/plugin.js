import DonutSetup from './models/setup';
import donutSetupBlock from './blocks/setup';

export default async (app, pre) => {
  app.shortcut(pre('new'), async ({
    shortcut, ack, context, client,
  }) => {
    try {
      await ack();

      const donutSetup = new DonutSetup();
      await donutSetup.save();

      const response = await client.views.open({
        token: context.botToken,
        trigger_id: shortcut.trigger_id,
        view: donutSetupBlock(pre, donutSetup),
      });

      if (!response.ok) {
        // TODO
        return;
      }

      const view = response.view;
      donutSetup.viewId = view.id;
      await donutSetup.save();
    } catch (e) {
      // TODO
    }
  });

  app.action({ type: 'block_actions', action_id: pre('setup_add') }, async ({ ack, body, context }) => {
    try {
      await ack();

      if (!body.view) {
        // TODO
        return;
      }

      const donutSetup = await DonutSetup.findOne({ viewId: body.view.id });
      if (!donutSetup) {
        // TODO
        return;
      }
      donutSetup.groupCount += 1;
      await donutSetup.save();

      await app.client.views.update({
        token: context.botToken,
        view_id: body.view.id,
        view: donutSetupBlock(pre, donutSetup),
      });
    } catch (e) {
      // TODO
    }
  });
};
