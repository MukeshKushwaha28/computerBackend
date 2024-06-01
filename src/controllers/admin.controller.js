import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Student} from "../models/student.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Admin} from "../models/admin.model.js";
import {Franchise} from "../models/franchise.model.js";
import { hashPassword ,comparePassword} from "../middlewares/authHelper.js";
import JWT from "jsonwebtoken";


const createAdmin = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    if(!name || !email || !password){
        throw new ApiError(400, "Please provide all the required fields")
    }


    const hashedPassword = await hashPassword(password);

    const admin = await Admin.create({
        name,
        email,
        password:hashedPassword
    });

    // const admin_new = admin.select("-password");

    return res
    .status(200)
    .json(new ApiResponse(200, admin,"Admin created successfully"));
});


const loginAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const admin = await Admin.findOne({email});

    if(!admin){
        throw new ApiError(404, "Invalid credentials")
    }

    const match = await comparePassword(password, admin.password);

    // const isPasswordCorrect = await admin.isPasswordCorrect(password);

    if(!match){
        throw new ApiError(404, "Invalid credentials")
    }


    //token
    const token = await JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      res.status(200).send({
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token,
      });
});


const getallStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({});
    return res
    .status(200)
    .json(new ApiResponse(200,students,"All students fetched successfully"));
});


const getallFranchises = asyncHandler(async (req, res) => {
    const franchises = await Franchise.find({});
    return res
    .status(200)
    .json(new ApiResponse(200,franchises,"All franchises fetched successfully"));
});


const getNewFranchiseRequests = asyncHandler(async (req, res) => {
    const franchises = await Franchise.find({isVerified: false});
    return res
    .status(200)
    .json(new ApiResponse(200,franchises,"All new franchise requests fetched successfully"));
});


const getFranchise = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if(!id){
        throw new ApiError(400, "Please provide the franchise id")
    }

    const franchise = await Franchise.findById(id);

    if(!franchise){
        throw new ApiError(404, "Franchise not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,franchise,"Franchise application fetched successfully"));
});


const verifyFranchise = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if(!id){
        throw new ApiError(400, "Please provide the franchise id")
    }

    const franchise = await Franchise.findById(id);

    if(!franchise){
        throw new ApiError(404, "Franchise not found")
    }

    franchise.isVerified = true;

    await franchise.save();

    return res
    .status(200)
    .json(new ApiResponse(200,franchise,"Franchise application verified successfully"));
});


const allVerifyfranchise = async(req,res)=>{
       try{
           const franchise = await Franchise.find({isVerified:true});
           if(!franchise){
            return res.send("franchise not found");
           }

           res.status(200).send(franchise);
       }catch(erro){
         res.send(error)
       }
}



export {
    createAdmin,
    loginAdmin,
    allVerifyfranchise,
    getallStudents,
    getallFranchises,
    getNewFranchiseRequests,
    getFranchise,
    verifyFranchise
}