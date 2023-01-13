const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema({
    message: String ,
    name: String,
    timestamp: String,
    receive: Boolean
});

module.exports = mongoose.model('messages', whatsappSchema);
// export default mongoose.model('message', whatsappSchema);