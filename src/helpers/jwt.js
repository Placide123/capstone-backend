import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signToken=(payload)=>{
    return jwt.sign(payload,process.env.TOKEN_KEY);
}
export const decodeToken=(token)=>{
    return jwt.decode(token,process.env.TOKEN_KEY);
}