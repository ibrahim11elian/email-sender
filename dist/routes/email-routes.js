"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = __importDefault(require("../controller/email"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const emailController = new email_1.default();
const validateRequest = [
    (0, express_validator_1.body)('name')
        .isLength({ min: 4, max: 20 })
        .withMessage('Name must be between 4 and 20 characters')
        .notEmpty()
        .withMessage('Name is required'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone is required'),
    (0, express_validator_1.body)('to')
        .isEmail()
        .withMessage('To must be a valid email address')
        .notEmpty()
        .withMessage('To is required'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .notEmpty()
        .withMessage('Email is required'),
    (0, express_validator_1.body)('message')
        .isLength({ min: 20, max: 500 })
        .withMessage('Message is must be at least 20 character and at most 500')
        .notEmpty()
        .withMessage('Message is required'),
];
router.post('/', validateRequest, emailController.sendEmail);
exports.default = router;
