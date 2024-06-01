import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Course} from "../models/course.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createCourse = asyncHandler(async (req, res) => {
    const {courseCategory, duration, courseName,description} = req.body;

    if(!courseCategory || !duration || !courseName || !description){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const course = await Course.create({
        courseCategory,
        duration,
        courseName,
        description
    })

    return res
    .status(200)
    .json(new ApiResponse(200,course,"Course created successfully"))
});


const deleteCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    if(!courseId){
        throw new ApiError(400, "Please provide the course id")
    }

    const course = await Course.findByIdAndDelete(courseId);

    if(!course){
        throw new ApiError(404, "Course not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,course,"Course deleted successfully"))
});

// const getAllCourses = asyncHandler(async (req, res) => {
//     const courses = await Course.find();

//     return res
//     .status(200)
//     .json(new ApiResponse(200,courses,"Courses fetched successfully"))
// });



const getAllCourses = asyncHandler(async (req, res) => {

    const category = req.query.category;
    const duration = req.query.duration;

    if(category && duration){
        const courses = await Course.find({courseCategory: category, duration: duration});
        return res
        .status(200)
        .json(new ApiResponse(200,courses,"Courses fetched successfully"))
    }

    const courses = await Course.find();

    return res
    .status(200)
    .json(new ApiResponse(200,courses,"Courses fetched successfully"))
});

const getCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    if(!courseId){
        throw new ApiError(400, "Please provide the course id")
    }

    const course = await Course.findById(courseId);

    if(!course){
        throw new ApiError(404, "Course not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,course,"Course fetched successfully"))
});

const updateCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    if(!courseId){
        throw new ApiError(400, "Please provide the course id")
    }

    const {courseCategory, duration, courseName,description} = req.body;

    if(!courseCategory || !duration || !courseName){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const course = await Course.findByIdAndUpdate(courseId,{
        courseCategory,
        duration,
        courseName,
        description,
    },{new: true});

    if(!course){
        throw new ApiError(404, "Course not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,course,"Course updated successfully"))
});

export {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourse,
    updateCourse,
}