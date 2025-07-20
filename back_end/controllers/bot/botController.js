const addImage = async (bot, msg)=>{
	try{
	    if(msg.photo){
		    const img = msg.photo[msg.photo.length-1].file_id;
		    const sender = msg.from.id;
		    const caption = msg.caption || ""
		    await data.create({ img,sender,caption})
	    }
    }catch(err){
	    console.log(err)
	    bot.sendMessage(msg.chat.id, err)
    }
}
module.export = addImage
