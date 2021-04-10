export default async (app) => {
  app.message(((`Update me`), async ({message, say}) => {
    await say(`Hello, <@${message.user}>! What a silly question. Try :bell_pepper: or :bacon: or heck, just :cheese:!!`)
  }));
}
let msg_opener = await say(`Extra extra! Read all about it! Here are the most recent notes from the ` + date + ` ` + title + ` :rolled_up_newspaper:`);
let msg_tldr = await say(`TLDR: ` + tldr);
let msg_events = await say(`Events: ` + events);
let title = await fetch(msg_title);
let date = await fetch(msg_date);
let tldr = await fetch(msg_tldr);
let events = await fetch(msg_events);
