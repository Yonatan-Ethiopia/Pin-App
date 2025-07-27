const data = require("../../models/dataModel")
const addImage = async (bot, msg) => {
  try {
    if (msg.photo) {
      const img = msg.photo[msg.photo.length - 1].file_id;
      const caption = msg.caption || "";

      const user = msg.forward_from || msg.from;

      const senderId = user?.id || null;
      const senderName = user?.first_name || "student";

      await data.create({
        img,
        caption,
        senderId,
        senderName,
      });

      console.log("image added");
    }
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, "Error adding image: " + err.message);
  }
};

module.exports = addImage
