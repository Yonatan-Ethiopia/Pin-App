const mongoose = require("mongoose");
require("dotenv").config();
module.exports = ()=> {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDb"))
      .catch((err) => console.log(err));
}
