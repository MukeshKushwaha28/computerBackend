import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  getallStudents,
  getallFranchises,
  getNewFranchiseRequests,
  getFranchise,
  verifyFranchise,
  allVerifyfranchise,
} from "../controllers/admin.controller.js";

import {isAdmin,requireSignIn} from  "../middlewares/protected.js"

const router = Router();

router.route("/create-admin").post(createAdmin);

router.route("/login-admin").post(loginAdmin);

router.route("/get-all-students").get(getallStudents);

router.route("/get-all-franchises").get(getallFranchises);
router.route("/get-all-verified-franchises").get(allVerifyfranchise);



//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.route("/get-new-franchise-requests").get(getNewFranchiseRequests);

router.route("/get-franchise/:id").get(getFranchise);

router.route("/verify-franchise/:id").get(verifyFranchise);

export default router;