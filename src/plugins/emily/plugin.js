export default async (app) => {
  app.message(':turtle:', async({message, say}) => {
    await say(`Hello, <@${message.user}>! This is the helpful turtle bot. What can I help you with?`)
  })
}