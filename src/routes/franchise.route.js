import {Router} from "express";
import {
    createFranchise,
    deleteFranchise,
    loggedInFranchise,
} from "../controllers/franchise.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/franchise-register").post(
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "id_proof", maxCount: 1 },
        { name: "photoOfInstitute", maxCount: 1 },
        { name: "voterIdOfHead", maxCount: 1 },
        { name: "panOfHead", maxCount: 1 },
        { name: "tradeLicOfInstitute", maxCount: 1 },
        { name: "photoOfInstituteOffice", maxCount: 1 },
    ]),
    createFranchise
);

router.route("/franchise-login").post(loggedInFranchise);

router.route("/franchise-delete/:franchiseId").delete(deleteFranchise);

export default router;