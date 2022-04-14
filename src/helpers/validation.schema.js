import Joi from "joi";

export const subscribersValidation=(subscriber1)=>{
    const schema=Joi.object({
        Email:Joi.string().min(2).required().email(),
    });
    return schema.validate(subscriber1);
}


export const querryValidation=(querry)=>{
    const schema=Joi.object({
            Name:Joi.string().min(2),
            Email:Joi.string().min(2).required().email(),
            message:Joi.string().min(10),
        });
        return schema.validate(querry);
}