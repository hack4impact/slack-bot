export default async (app) => {
  app.message(('Does :pineapple: belong on :pizza:?'), async ({message, say}) => {
    await say(pizza_msg)
  })
}
export default async (app) => {
  app.message(('Does pineapple belong on pizza?'), async ({message, say}) => {
    await say(pizza_msg)
  })
}

var pizza_msg = 'Hello, <@${message.user}>! What a silly question. Try :bell_pepper: or :bacon: or heck, just :cheese:!!';