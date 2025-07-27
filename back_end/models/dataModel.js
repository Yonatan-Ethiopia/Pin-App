const mongoose = require('mongoose')
const dataSchema = new mongoose.Schema({
	img:{ type:String, requirded:true },
	senderId:{ type:String, required:true },
	senderName:{ type:String, required: true},
	caption:{ type:String }
})
module.exports = mongoose.model('data',dataSchema)
