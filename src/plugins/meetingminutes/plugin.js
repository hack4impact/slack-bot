export default async (app) => {
  app.message(((`Update me`), async ({message, say}) => {
    await say(msg_opener);
    await say(msg_tlder);
    await say(msg_events);
  }));
}
let msg_opener = await say(`Extra extra! Read all about it! Here are the most recent notes from the ` + date + ` ` + title + ` :rolled_up_newspaper:`);
let msg_tldr = await say(`TLDR: ` + tldr);
let msg_events = await say(`Events: ` + events);
// FIXME fetch parameters
let title = await fetch(msg_title);
let date = await fetch(msg_date);
let tldr = await fetch(msg_tldr);
let events = await fetch(msg_events);
