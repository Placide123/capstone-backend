import mongoose from "mongoose";

const subscriberSchema= new mongoose.Schema({
Email:String
});

const Subscriber =mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;