/* eslint-disable no-undef */
import path from 'path';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';
// import AppError from './error.js';
// import { IUser } from '../models/user/user.js';
// import logger from './logger.js';

type USER = {
  to: string;
  fullName: string;
  phone: string;
  from: string;
};

class Email {
  private to: string;
  private fullName: string;
  private from: string;
  private phone: string;

  constructor(user: USER) {
    this.to = user.to;
    this.fullName = user.fullName;
    this.from = user.from;
    this.phone = user.phone;
  }

  private createNewTransport() {
    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_PORT ||
      !process.env.EMAIL_USERNAME ||
      !process.env.EMAIL_PASSWORD
    ) {
      throw new Error('Missing environment variables for email configuration');
    }

    if (process.env.NODE_ENV === 'production') {
      if (!process.env.SENDGRID_USERNAME || !process.env.SENDGRID_PASSWORD) {
        throw new Error('Missing SendGrid environment variables');
      }
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT, 10),
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    } as nodemailer.TransportOptions);
  }

  private async send(
    template: string,
    subject: string,
    variables: Record<string, unknown> = {},
    message?: string,
  ) {
    try {
      // render HTML based on a Pug template
      const html = pug.renderFile(
        path.join(process.cwd(), 'src', 'views', `${template}.pug`),
        {
          ...variables,
          subject,
          message,
        },
      );

      // define the email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText(html),
        attachments: [
          {
            filename: 'logo.svg',
            path: path.join(process.cwd(), 'src', 'assets', 'logo.svg'),
            cid: 'logo',
          },
        ],
      };

      // create transporter
      const transporter = this.createNewTransport();

      // send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Error sending email to user ${this.to}:`, error);
      // throw new AppError('Error Sending email', 500);
    }
  }

  async sendMessage(message: string) {
    await this.send(
      'message',
      `Message from ${this.fullName}`,
      {
        name: this.fullName,
        phone: this.phone,
      },
      message,
    );
  }
}

export default Email;
