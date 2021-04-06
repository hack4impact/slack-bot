export default async (app) => {
  app.message(((`Does :pineapple: belong on :pizza:?`), async ({message, say}) => {
    await say(`Hello, <@${message.user}>! What a silly question. Try :bell_pepper: or :bacon: or heck, just :cheese:!!`)
  }),
  app.message(((`Does pineapple belong on pizza?`), async ({message, say}) => {
    await say(`Hello, <@${message.user}>! What a silly question. Try :bell_pepper: or :bacon: or heck, just :cheese:!!`)
  })
}

//var pizza_msg = `Hello, <@${message.user}>! What a silly question. Try :bell_pepper: or :bacon: or heck, just :cheese:!!`;