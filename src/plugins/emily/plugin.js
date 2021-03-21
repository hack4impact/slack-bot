export default async (app, pre) => {
  app.message(pre('new'), async({message, say}) => {
    await say('Hello, <@${message.user}>!')
  })
}