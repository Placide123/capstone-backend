import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
Name: String,
Email: String,
message:String,
});

const Message =mongoose.model('Message', messageSchema);
export default Message;