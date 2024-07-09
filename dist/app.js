"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const email_routes_1 = __importDefault(require("./routes/email-routes"));
const error_1 = __importDefault(require("./controller/error"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// this prevent the rate limiter effectively a global one and blocking all requests once the limit is reached (and this solve this issue)
// Where numberOfProxies (in this case 3) is the number of proxies between the user and the server(in this case vercel).
app.set('trust proxy', 3);
// Middlewares
// set security http headers
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Limit requests from the same IP
const limiter = (0, express_rate_limit_1.default)({
    max: 60,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
// Compress middleware
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// static
// how to access the images in the next line
// http://localhost:3000/assets/logo.svg
app.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'src', 'assets')));
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the email sender API<h1>');
});
app.use('/api/v1/email', email_routes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Page not found',
        status: 404,
    });
});
// Global error handler
app.use(error_1.default);
