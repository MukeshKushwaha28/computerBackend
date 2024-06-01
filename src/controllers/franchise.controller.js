import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Franchise} from "../models/franchise.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createFranchise = asyncHandler(async (req, res) => {
    const {
        state,
        district,
        town,
        nameOfInstitute,
        pin,
        postalAdressOfInstitute,
        mobileInstitute,
        emailIdOfInstitute,
        nameOfCentralHead,
        position,
        mobileHead,
        emailHead,
        dateofBirth,
        addressofHead,
        gender,
        password
    } = req.body;

    if(!state || !district || !town || !nameOfInstitute || !pin || !mobileInstitute || !emailIdOfInstitute || !nameOfCentralHead || !position || !mobileHead || !emailHead || !dateofBirth || !addressofHead || !gender || !password || !postalAdressOfInstitute){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const photoLocalpath = req.files?.photo[0]?.path;
    const id_proofLocalpath = req.files?.id_proof[0]?.path;
    const photoOfInstituteLocalpath = req.files?.photoOfInstitute[0]?.path;
    const voterIdOfHeadLocalpath = req.files?.voterIdOfHead[0]?.path;
    const panOfHeadLocalpath = req.files?.panOfHead[0]?.path;
    const tradeLicOfInstituteLocalpath = req.files?.tradeLicOfInstitute[0]?.path;
    const photoOfInstituteOfficeLocalpath = req.files?.photoOfInstituteOffice[0]?.path;

    if(!photoLocalpath || !id_proofLocalpath || !photoOfInstituteLocalpath || !voterIdOfHeadLocalpath || !panOfHeadLocalpath || !tradeLicOfInstituteLocalpath || !photoOfInstituteOfficeLocalpath){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const photo = await uploadOnCloudinary(photoLocalpath);
    const id_proof = await uploadOnCloudinary(id_proofLocalpath);
    const photoOfInstitute = await uploadOnCloudinary(photoOfInstituteLocalpath);
    const voterIdOfHead = await uploadOnCloudinary(voterIdOfHeadLocalpath);
    const panOfHead = await uploadOnCloudinary(panOfHeadLocalpath);
    const tradeLicOfInstitute = await uploadOnCloudinary(tradeLicOfInstituteLocalpath);
    const photoOfInstituteOffice = await uploadOnCloudinary(photoOfInstituteOfficeLocalpath);

    if(!photo || !id_proof || !photoOfInstitute || !voterIdOfHead || !panOfHead || !tradeLicOfInstitute || !photoOfInstituteOffice){
        throw new ApiError(500, "Internal server error")
    }

    const franchise = await Franchise.create({
        state,
        district,
        town,
        nameOfInstitute,
        pin,
        postalAdressOfInstitute,
        mobileInstitute,
        emailIdOfInstitute,
        nameOfCentralHead,
        position,
        mobileHead,
        emailHead,
        dateofBirth,
        addressofHead,
        gender,
        password,
        photo: photo.url,
        id_proof: id_proof.url,
        photoOfInstitute: photoOfInstitute.url,
        voterIdOfHead: voterIdOfHead.url,
        panOfHead: panOfHead.url,   
        tradeLicOfInstitute: tradeLicOfInstitute.url,
        photoOfInstituteOffice: photoOfInstituteOffice.url
    })

    return res
    .status(200)
    .json(new ApiResponse(200,franchise,"Franchise request created successfully"));

});   


const deleteFranchise = asyncHandler(async (req, res) => {
    const franchiseId = req.params.id;

    if(!franchiseId){
        throw new ApiError(400, "Please provide the franchise id")
    }

    const franchise = await Franchise.findByIdAndDelete(franchiseId);

    if(!franchise){
        throw new ApiError(404, "Franchise not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,franchise,"Franchise request deleted successfully"))
});

const loggedInFranchise = asyncHandler(async (req, res) => {
    const {emailIdOfInstitute, password} = req.body;

    if(!emailIdOfInstitute || !password){
        throw new ApiError(400, "Please provide all the required fields")
    }

    const franchise = await Franchise.findOne({emailIdOfInstitute});

    if(!franchise){
        throw new ApiError(404, "Franchise not found")
    }

    const isPasswordCorrect = await franchise.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid credentials")
    }

    const loginFranchise = await Franchise.findById(franchise._id).select("-password");

    return res
    .status(200)
    .json(new ApiResponse(200, loginFranchise, "Franchise logged in successfully"));

});

export{
    createFranchise,
    deleteFranchise,
    loggedInFranchise
}