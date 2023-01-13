const mongoose = require("mongoose");
const Messages = require("../db/connect");

uri = "mongodb+srv://ijazliaqat:JHaxNI35@whatsapp1.gyijpo2.mongodb.net/whatsapp1?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);
const connectDB = () =>{
    console.log('connect DB');
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;