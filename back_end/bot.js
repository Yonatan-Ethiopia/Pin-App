const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const addImage = require('./controllers/bot/botController');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);
const URL = process.env.WEBHOOK_URL;
bot.onText(/\/start/, async (msg) => {
  console.log("start is clicked")
  bot.sendMessage(msg.chat.id, "Welcome to AASTU GALLERY!",{reply_markup:{inline_keyboad:[[{ text: "Open Gallery", web_app:{ url: URL}}]]}});
});

bot.on('message', (msg) => {
  addImage(bot, msg);
});

module.exports = bot;
  
