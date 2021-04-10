export default async (app) => {
  app.message(((`Update me`), async ({message, say}) => {
    await say(msg_opener);
    await say(msg_tlder);
    await say(msg_events);
  }));
}
let msg_opener = `Extra extra! Read all about it! Here are the most recent notes from the ` + date + ` ` + title + ` :rolled_up_newspaper:`;
let msg_tldr = `TLDR: ` + tldr;
let msg_events = `Events: ` + events;
// FIXME fetch parameters
let title, date, tldr, events;
fetch("./data/meeting.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    console.log(data);
    title = data.title;
    date = data.date;
    tldr = data.tldr;
    events = data.events;
  });