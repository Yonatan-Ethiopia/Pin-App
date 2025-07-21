const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const addImage = require('./controllers/bot/botController');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to AASTU GALLERY!");
});

bot.on('message', (msg) => {
  addImage(bot, msg);
});

module.exports = bot;
  
