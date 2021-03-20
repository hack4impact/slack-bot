
export default async (app, pre) => {
  app.message(pre('hello world'), async ({message, say}) => {
    await say(`Hello, <@${message.user}>!`)
  })
}