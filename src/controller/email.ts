import { validationResult } from 'express-validator';
import Email from '../utils/email';
import { NextFunction, Request, Response } from 'express';
export default class EmailController {
  async sendEmail(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
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

    const emailSender = new Email(user);

    try {
      await emailSender.sendMessage(message);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      next(error);
    }
  }
}
