"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const email_1 = __importDefault(require("../utils/email"));
class EmailController {
    async sendEmail(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, message, to } = req.body;
        const user = {
            fullName: name,
            from: email,
            phone,
            to,
        };
        const emailSender = new email_1.default(user);
        const logo = `${req.protocol}://${req.get("host")}/assets/logo.svg`;
        try {
            await emailSender.sendMessage(message, logo);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = EmailController;
