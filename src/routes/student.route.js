import { Router } from "express";
import {
    createStudent,
    loginStudent,
} from "../controllers/student.controller.js";
import {upload} from  "../middlewares/multer.middleware.js";

const router = Router();

router.route("/student-register").post(
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "id_proof", maxCount: 1 },
    ]),
    createStudent
);
        
router.route("/student-login").post(loginStudent);

export default router;