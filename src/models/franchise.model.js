import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

const franchiseSchema = new Schema({
    state: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    district: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    town: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    nameOfInstitute: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    pin: {
        type : Number,
        required: true
    },
    postalAdressOfInstitute: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    mobileInstitute: {
        type: Number,
        required: true
    },
    emailIdOfInstitute: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    // detalis of head of institute.

    nameOfCentralHead: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    mobileHead: {
        type : Number,
        required: true,
    },
    emailHead: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    dateofBirth: {
        type: Date,
        required: true,
    },
    addressofHead: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        lowecase: true,
        trim: true,
    },
    // centreCode: {
    //     type: String,
    //     // required: true,
    //     lowecase: true,
    //     unique: true,
    //     trim: true,
    // },
    isVerified: {
        type: Boolean,
        default: false
    },
    // image of document
    photo: {
        type: String,
        required: true,
    },
    id_proof: {
        type: String,
        required: true,
    },
    photoOfInstitute: {
        type: String,
        required: true,
    },
    voterIdOfHead: {
        type: String,
        required: true,
    },
    panOfHead: {
        type: String,
        required: true,
    },
    tradeLicOfInstitute: {
        type: String,
        required: true,
    },
    photoOfInstituteOffice: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
})


franchiseSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
} )

franchiseSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

export const Franchise = mongoose.model('Franchise', franchiseSchema)