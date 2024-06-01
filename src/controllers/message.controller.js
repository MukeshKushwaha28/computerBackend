import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createMessage = asyncHandler(async (req, res) => {
    const {
        personName,
        mobileNumber,
        email,
        message
    } = req.body;

    if(!personName || !mobileNumber || !email || !message){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const newMessage = await Message.create({
        personName,
        mobileNumber,
        email,
        message
    })

    res
    .status(201)
    .json(new ApiResponse(201,newMessage ,"Message sent successfully"))
}
)

const getUnreadMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({isRead: false});
    res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"))
}
)

const getReadMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({isRead: true});
    res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"))
}
)

const markAsRead = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const message = await Message.findById(id);
    if(!message){
        throw new ApiError(404, "Message not found")
    }
    message.isRead = true;
    await message.save();
    res
    .status(200)
    .json(new ApiResponse(200, message, "Message marked as read successfully"))
}
)

const deleteMessage = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const message = await Message.findByIdAndDelete(id);
    if(!message){
        throw new ApiError(404, "Message not found")
    }
    res
    .status(200)
    .json(new ApiResponse(200, message, "Message deleted successfully"))
}
)

const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"))
}
)

export {
    createMessage,
    getUnreadMessages,
    getReadMessages,
    markAsRead,
    deleteMessage,
    getAllMessages
}