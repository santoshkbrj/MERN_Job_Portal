
import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAyncError.js";
import errorHandler from "./error.js";
import Jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler("User not authoried", 401));
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
});