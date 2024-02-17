import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8, "Password must contain atleast 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enums: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.new,
    },
});

// ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
userSchema.methods.getJWToken = function () {
    return Jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);


