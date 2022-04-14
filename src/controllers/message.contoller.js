import Message from "../database/model/message";
import { querryValidation } from "../helpers/validation.schema";

export const saveMessage = async (req, res) => {
	const { error} =querryValidation(req.body);
	if(error){
		return res.status(400).json({message:error.details[0].message});
	}
    const message = req.body;
    const newMessage = new Message(message);
    await newMessage.save();
    res.status(201).json({success: true, data: newMessage});
}

export const getAllMessage = async (req, res) => {
    const messages= await Message.find();
    res.status(200).json({success: true, data: messages})
}


export const updateMessage= async (req, res) =>{
	try {
		const message = await Message.findOne({ _id: req.params.id })

		if (req.body.Name) {
			message.Name = req.body.Name
		}

		if (req.body.Email) {
			message.Email = req.body.Email
		}
        if (req.body.message) {
			message.message = req.body.message
		}

		await message.save()
		res.send(message)
	} catch {
		res.status(404)
		res.send({ error: "This message doesn't exist!" })
	}
}

export const deleteMessage=async (req, res) => {
	try {
		await Message.deleteOne({ _id: req.params.id })
		res.status(204).json({success: true, data: null})
	} catch {
		res.status(404)
		res.send({ error: "Message doesn't exist!" })
	}
}
