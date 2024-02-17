import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        minLength: [3, "Job title must contian at least 3 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide job description"],
        minLength: [30, "Job description must contain at least 30 characters"],
        maxLength: [500, "Job description cannot be exceed 500 characters"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category."],
    },
    country: {
        type: String,
        required: [true, "Please provide a country name."],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },
    location: {
        type: String,
        required: [true, "Please provide location"],
        minLength: [20, "Job location must contain at least 20 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digit"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

});

export const Job = mongoose.model("Job", jobSchema);