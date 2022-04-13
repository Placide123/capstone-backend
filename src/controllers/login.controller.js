import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/model/signup";
export const login = async (req, res)=>{
    
    try{
        //Get user input
        const {email, password}=req.body;
        //validate if user exist in our database
if(!(email&&password)){
    res.status(400).send("All input is required");
}
if(User.user && (await bcrypt.compare(password,(User.user).password))){
    const token=jwt.sign(
        {user_id: (User.user)._id,email},
        process.env.TOKEN_KEY,
        {
            expiresIn:"2h",
        }
    );
    //save user token

    (User.user).token=token;
    res.status(400).send("Invalid credentials");
}

}catch(err){
    console.log(err);
}

}