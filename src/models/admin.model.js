import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    name: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type : String,
        required: true,
        lowecase: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 1,
      },
},
{timestamps: true}
);


export const Admin = mongoose.model('Admin', adminSchema);

adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    next();
});