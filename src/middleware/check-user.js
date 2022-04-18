import { decodedToken } from "../helpers/jwt";
export const checkAuth=(req,res,next) =>{
    const bearerToken=req.headers.authorization;
    if(bearerToken){
        const token=bearerToken.split(" ")[1];
        const payload=decodedToken(token);
        if (payload) return next();
        return res.status(401).json({status: "fail", message:"Not Authorized"});
    }
    return res.status(401).json({status:"fail",message:"Not Authorized, please login"});
};
export const checkAdminAuth=(req,res,next)=>{
    const bearerToken=req.headers.authorization;
    if(bearerToken){
        const token=bearerToken.split(" ")[1];
        console.log(token);
        const payload=decodedToken(token);
        console.log(payload);
        if(payload){
            if(payload?.email==="castlewitty@gmail.com") return next();
            return res.status(401).json({status:fail,message:"you don't have permission to perform this action",});
        }
        return res.status(401).json({status:"fail",message:"not authorized"});
    }
   return res.status(401).json({status:"fail",message:"not Authorized,please login"}); 
}