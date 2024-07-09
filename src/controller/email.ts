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
    const logo = `${req.protocol}://${req.get('host')}/assets/logo.svg`;
    try {
      await emailSender.sendMessage(message, logo);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      next(error);
    }
  }
}
