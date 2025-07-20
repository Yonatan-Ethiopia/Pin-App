const express = require('express')
const telegramBot=require('node-telegram-bot-api')
const data = require('./models/dataModel')
const addImage = require('.controllers/bot/botController');
require('dotenv').config();
const token=process.env.BOT_TOKEN;
const port = process.env.PORT
const app = express()
const WEBHOOK_URL = process.env.WEBHOOK_URL
const bot = new telegramBot( token, { webHook :{ port: port}})
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`)
app.use(express.json())
app.post(`/bot${token}`,(req,res)=>{
	 bot.processUpdate(req.body)
	 res.sendStatus(200)
})
bot.onStart( '/start', (msg)=>{
	bot.sendMesssage(msg.chat.id," Welcome to AASTU GALLERY!/n You can use our mini app to watch the gallery!")
}) 
bot.on('message', (msg)=>{
	addImage(bot,msg)
})
app.listen(port, ()=>{
	console.log(`Server running on port ${port}`)
});                      
