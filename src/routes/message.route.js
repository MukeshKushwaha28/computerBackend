import { Router } from "express";
import {
    createMessage,
    getUnreadMessages,
    getReadMessages,
    markAsRead,
    deleteMessage,
    getAllMessages
} from "../controllers/message.controller.js";

const router = Router();

router.route('/create-message').post(createMessage);

router.route('/delete-message/:id').delete(deleteMessage);

router.route('/get-all-messages').get(getAllMessages);

router.route('/get-unread-messages').get(getUnreadMessages);

router.route('/get-read-messages').get(getReadMessages);

router.route('/mark-as-read/:id').put(markAsRead);

export default router;