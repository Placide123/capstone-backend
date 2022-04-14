import Subscriber from "../database/model/subscriber";
import { subscribersValidation } from "../helpers/validation.schema";

export const saveSubscriber = async (req, res) => {
	const{ error }=subscribersValidation(req.body);
	if(error) {
		return res.status(400).json({message:error.details[0].message});
	}

	let oldSubscriber= await Subscriber.findOne({Email:req.body.Email})
	if (oldSubscriber){
		return res.status(400).json({error:true,message:"You have already Subscriber"});
	}
	const subscriber=req.body;
    const newSubscriber = new Subscriber(subscriber);
    await newSubscriber.save();
    res.status(201).json({success: true, data: newSubscriber});
}

export const getAllSubscriber = async (req, res) => {
    const subscribers= await Subscriber.find();
    res.status(200).json({success: true, data: subscribers})
}

export const updateSubscriber= async (req, res) =>{
	try {
		const subscriber = await Subscriber.findOne({ _id: req.params.id })

		if (req.body.Email) {
			subscriber.Email = req.body.Email
		}

		await subscriber.save()
		res.send(subscriber)
	} catch {
		res.status(404)
		res.send({ error: "This message doesn't exist!" })
	}
}

export const deleteSubscriber=async (req, res) => {
	try {
		await Subscriber.deleteOne({ _id: req.params.id })
		res.status(204).json({success: true, data: null})
	} catch {
		res.status(404)
		res.send({ error: "Subscriber doesn't exist!" })
	}
}
