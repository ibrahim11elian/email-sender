import express from 'express';
import dotenv from 'dotenv';
import router from './routes/email-routes';
import errorHandler from './controller/error';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// this prevent the rate limiter effectively a global one and blocking all requests once the limit is reached (and this solve this issue)
// Where numberOfProxies (in this case 3) is the number of proxies between the user and the server(in this case vercel).
app.set('trust proxy', 3);

// Middlewares
// set security http headers
app.use(helmet());

app.use(cors());

// Limit requests from the same IP
const limiter = rateLimit({
  max: 60,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Compress middleware
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the email sender API<h1>');
});

app.use('/api/v1/email', router);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Page not found',
    status: 404,
  });
});

// Global error handler
app.use(errorHandler);

export { app };
