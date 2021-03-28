
export default async (app, pre) => {
  app.message(pre('pepsi or coke?'), async ({message, say}) => {
    await say(`Hello, <@${message.user}>! Since I am a bot, I am not privileged to such carbonated drinks, but coke is superior.`)
  })
}