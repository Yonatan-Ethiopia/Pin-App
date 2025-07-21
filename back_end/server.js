const express = require('express')
const bot = require('/bot.js')
const db = require('./config/db')
require('dotenv').config()
const port = process.env.PORT
const app = express()
const getRoute = require('/routes/getRoute')
app.use(express.json())
app.use('/api', getRoute)
app.listen( port, async ()=>{
	console.log(`Server running on port ${port}`)
	await bot.setWehook('')
})
