"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = __importDefault(require("./error"));
dotenv_1.default.config();
class Email {
    constructor(user) {
        this.to = user.to;
        this.fullName = user.fullName;
        this.from = user.from;
        this.phone = user.phone;
    }
    createNewTransport() {
        if (!process.env.EMAIL_HOST ||
            !process.env.EMAIL_PORT ||
            !process.env.EMAIL_USERNAME ||
            !process.env.EMAIL_PASSWORD) {
            throw new Error('Missing environment variables for email configuration');
        }
        if (process.env.NODE_ENV === 'production') {
            if (!process.env.SENDGRID_USERNAME || !process.env.SENDGRID_PASSWORD) {
                throw new Error('Missing SendGrid environment variables');
            }
            return nodemailer_1.default.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }
        return nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async send(template, subject, variables = {}, message) {
        try {
            // render HTML based on a Pug template
            const html = pug_1.default.renderFile(path_1.default.join(process.cwd(), 'src', 'views', `${template}.pug`), {
                ...variables,
                subject,
                message,
                email: this.from,
            });
            // define the email options
            const mailOptions = {
                from: process.env.VERIFIED_SENDER_EMAIL,
                to: this.to,
                subject,
                html,
                text: (0, html_to_text_1.htmlToText)(html),
                replyTo: this.from,
            };
            // create transporter
            const transporter = this.createNewTransport();
            // send email
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.log(`Error sending email to user ${this.to}:`, error);
            throw new error_1.default('Error Sending email', 500);
        }
    }
    async sendMessage(message) {
        await this.send('message', `Message from ${this.fullName}`, {
            name: this.fullName,
            phone: this.phone,
        }, message);
    }
}
exports.default = Email;
