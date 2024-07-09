"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../utils/error"));
/** Global error handling middleware for sending the error in both development and production */
function default_1(err, req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
    else {
        sendErrorDev(err, res);
    }
}
exports.default = default_1;
function sendErrorProd(err, res) {
    // In production, only send the error message and status code
    let statusCode = 500;
    let status = 'error';
    if (err instanceof error_1.default) {
        statusCode = err.statusCode;
        status = err.status;
        return res.status(statusCode).json({
            status,
            error: err.message,
        });
    }
    else {
        return res.status(statusCode).json({
            status,
            error: 'Something went wrong',
        });
    }
}
function sendErrorDev(err, res) {
    // In development, send the entire error object
    let statusCode = 500;
    if (err instanceof error_1.default) {
        statusCode = err.statusCode;
    }
    return res.status(statusCode).json({
        code: statusCode,
        error: err.message,
        stack: err.stack,
    });
}
