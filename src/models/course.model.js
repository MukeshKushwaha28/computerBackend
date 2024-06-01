import mongoose, {Schema} from "mongoose"

const courseSchema = new Schema({
    courseCategory : {
        type : String,
        required: true
    },
    duration : {
        type : String,
        required: true
    },
    courseName : {
        type : String,
        required: true
    },
    description:{
        type:String,
        required:true,
    }
}, 
{timestamps: true}
)

export const Course = mongoose.model("Course",courseSchema)