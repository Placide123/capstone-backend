import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/model/signup";
export const Signup = async (req, res)=>{
    try{
        const{firstName,lastName,email,password}=req.body;
        const oldUser= await User.findOne({email});
        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword =await bcrypt.hash(password,10);

        const user= await User.create({
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:encryptedPassword,
        });
    console.log(user);
        const token=jwt.sign(
            {user_id: user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h",
            }
        );

        user.token=token;

        res.status(201).json(user);
    }catch(err){
console.log(err);
    }

}

export const getAllUser = async (req, res) => {
    const users= await User.find();
    res.status(200).json({success: true, data: users})
}


export const login = async (req, res)=>{
    try{
        //Get user input
        const {email, password}=req.body;
        //validate if user exist in our database
    if(!(email&&password)){
    res.status(400).send("All input is required");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
    const token=jwt.sign(
        {user_id: user._id,email},
        process.env.TOKEN_KEY,
        {
            expiresIn:"2h",
        }
    );
    //save user token

    user.token=token;
  res.status(200).json(user);  
}
res.status(400).send("Invalid credentials");
}catch(err){
    console.log(err);
}

}






















