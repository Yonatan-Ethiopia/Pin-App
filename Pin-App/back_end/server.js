const express = require('express')                                          
require('dotenv').config()
const port = process.env.PORT
const app = express()
const getRoute = require('routes/getRoute')
app.use(express.json())
app.use('/api', getRoute)
app.on( port, ()=>{
	console.log(`Server running on port ${port}`)
})
