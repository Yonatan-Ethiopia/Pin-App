const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path')
require('dotenv').config();

const getRoute = require('./routes/getRoute');
const addImage = require('./controllers/bot/botController');

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')(); // assuming db.js exports a connect function
app.use(express.serve(path.join(_dirname,'front_end')))
// API routes
app.use('/api', getRoute);
 app.get('/',(req,res)=>{
	 res.sendFile(path.join(_dirname,'front_end','index.html'))
})
// Telegram Bot setup
const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3003;
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

app.listen(port,'127.0.0.1', () => {
  console.log(`Server running on port ${port}`);
});

