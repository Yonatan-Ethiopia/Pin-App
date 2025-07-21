const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const getRoute = require('./routes/getRoute');
const addImage = require('./controllers/bot/botController');

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')(); // assuming db.js exports a connect function

// API routes
app.use('/api', getRoute);

// Telegram Bot setup
const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(token, { webHook: { port: port } });
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to AASTU GALLERY!\nUse our mini app to view the gallery!");
});

bot.on('message', (msg) => {
  addImage(bot, msg);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

