const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path')
const data = require('./models/dataModel')
require('dotenv').config();

const getRoute = require('./routes/getRoute');
const addImage = require('./controllers/bot/botController');

const app = express();
app.use(express.json());

// MongoDB connection
require('./config/db')();
const cors = require('cors')
app.use(cors({
  origin: '*', // or specify the domain instead of '*'
  credentials: true
}))

app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  console.log("Header sent")
 next();
});
 // assuming db.js exports a connect function
app.use(express.static(path.join(__dirname, 'front_end')));

// API routes
app.use('/api', getRoute);
app.get('/',(req,res)=>{
    console.log("get running")
	 //res.setHeader('ngrok-skip-browser-warning', 'true');
	 res.sendFile(path.join(__dirname,'front_end','index.html'))
    console.log("file sent")
})
// Telegram Bot setup
const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(token, { webHook: false });
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.onText(/\/start/, async (msg) => {
	
  bot.sendMessage(msg.chat.id, "Welcome to AASTU GALLERY!", {
  reply_markup: {
    inline_keyboard: [[
      {
       text: "Open Gallery",
        web_app: {
          url: WEBHOOK_URL
        }
      }
    ]]
  }
});
  console.log("bot is clicked")
});
bot.on('message', (msg) => {
  addImage(bot, msg);
});

app.listen(port,'127.0.0.1', () => {
  console.log(`Server running on port ${port}`);
});

