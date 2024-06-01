import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Student} from "../models/student.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createStudent = asyncHandler(async (req, res) => {
    const {
        name,
        fatherName,
        motherName,
        dob,
        email,
        mobile,
        password,
        gender,
        lastQualification,
        address,
        pin,
        city,
        course,
        franchise
    } = req.body;

    if(!name || !fatherName || !motherName || !dob || !email || !mobile || !password || !gender || !lastQualification || !address || !pin || !city || !course || !franchise){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const photoLocalpath = req.files?.photo[0]?.path;
    const id_proofLocalpath = req.files?.id_proof[0]?.path;


    if(!photoLocalpath || !id_proofLocalpath){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const photo = await uploadOnCloudinary(photoLocalpath);
    const id_proof = await uploadOnCloudinary(id_proofLocalpath);

    if(!photo || !id_proof){
        throw new ApiError(500, "Internal server error")
    }

    const student = await Student.create({
        name,
        fatherName,
        motherName,
        dob,
        email,
        mobile,
        password,
        gender,
        lastQualification,
        address,
        pin,
        city,
        course,
        franchise,
        photo: photo.url,
        id_proof: id_proof.url,
    })

    return res
    .status(200)
    .json(new ApiResponse(200, student, "Student created successfully"))
});


const loginStudent = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const student = await Student.findOne({email});

    if(!student){
        throw new ApiError(404, "Student not found")
    }

    const isPasswordCorrect = await student.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid credentials")
    }

    const loginStudent = await Student.findById(student._id).select("-password");


    return res
    .status(200)
    .json(new ApiResponse(200, loginStudent, "Student logged in successfully"));
});

export {
    createStudent,
    loginStudent,
}