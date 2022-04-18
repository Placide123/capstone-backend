import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signToken=(user)=>{
    return jwt.sign(user,process.env.TOKEN_KEY);
}
export const decodedToken=(token)=>{
    return jwt.decode(token,process.env.TOKEN_KEY);
}