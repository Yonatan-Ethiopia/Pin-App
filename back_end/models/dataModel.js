const mogoose = require('mogoose')
const dataSchema = new mongoose.Schema({
	img:{ type:String, requirded:true },
	sender:{ type:String, required:true },
	caption:{ type:String }
})
model.exports = mogoose.model('data',dataSchema)
