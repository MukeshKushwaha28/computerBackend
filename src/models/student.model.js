import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const studentSchema = new Schema({
    name: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    fatherName: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    motherName: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    dob: {
        type : Date,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    mobile: {
        type : Number,
        required: true,
    },
    password: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    gender: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    lastQualification: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    address: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    pin: {
        type : Number,
        required: true,
    },
    city: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    // photo of docs
    photo: {
        type : String,
        required: true,
    },
    id_proof: {
        type : String,
        required: true,
    },
    isVerified: {
        type : Boolean,
        default : false,
    },
    // course details
    course: {
        type : Schema.Types.ObjectId,
        ref : "Course",
    },
    // franchise details
    franchise: {
        type : Schema.Types.ObjectId,
        ref : "Franchise",
    },
},
{
    timestamps: true,
}
)

studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
} )

studentSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

export const Student = mongoose.model("Student", studentSchema);