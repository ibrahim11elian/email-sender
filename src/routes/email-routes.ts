import { Router } from 'express';
import EmailController from '../controller/email';
import { body } from 'express-validator';
const router = Router();
const emailController = new EmailController();

const validateRequest = [
  body('name')
    .isLength({ min: 4, max: 20 })
    .withMessage('Name must be between 4 and 20 characters')
    .notEmpty()
    .withMessage('Name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('to')
    .isEmail()
    .withMessage('To must be a valid email address')
    .notEmpty()
    .withMessage('To is required'),
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),
  body('message')
    .isLength({ min: 20, max: 500 })
    .withMessage('Message is must be at least 20 character and at most 500')
    .notEmpty()
    .withMessage('Message is required'),
];

router.post('/', validateRequest, emailController.sendEmail);

export default router;
