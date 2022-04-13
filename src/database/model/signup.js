import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
firstName: {type:String, default: null},
lastName: {type:String, default: null},
email:{type:String, unique:true},
password:{type:String},
token:{type:String},

});

const User =mongoose.model('User', userSchema);
export default User;