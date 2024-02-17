class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "caseError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new errorHandler(message, 400);
    }
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message, 400);
    }
    if (err.name === 'JsonWebTokenError') {
        const message = `JSON web token is invalid, Try Again`;
        err = new errorHandler(message, 400);
    }
    if (err.name === 'TokenExpiredError') {
        const message = `JSON Web Token is expire.Try again`;
        err = new errorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default errorHandler;