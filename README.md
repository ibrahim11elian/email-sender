# Email Sender API

This project is an API for sending emails from any address to any address using Node.js, TypeScript, Express, Nodemailer, and SendGrid. The API supports sending messages with a customizable template.

## Features

- Send emails from any email address to any recipient
- Use Pug templates for email content
- Validate input using express-validator
- Supports multiple environments (development and production)
- Security features using CORS, rate limiter, and Helmet
- Global error handling middleware

## Technologies Used

- Node.js
- TypeScript
- Express
- Nodemailer
- SendGrid
- Pug
- HTML-to-Text
- Express-Validator
- CORS
- Helmet
- Rate Limiter

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ibrahim11elian/email-sender.git
cd email-sender
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```.env
# sendgrid
SENDGRID_USERNAME=
SENDGRID_PASSWORD=
VERIFIED_SENDER_EMAIL=your-verified-sender-email@example.com
# mailtrap
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USERNAME=
EMAIL_PASSWORD=
```

## Usage

1. Start the dev server:

```bash
npm build
npm run dev
```

2. Make a POST request to `/api/v1/email` with the following JSON body: _the email will be sent to mailtrap in development and to actual email in production_

```json
{
  "to": "recipient@example.com",
  "email": "sender@example.com",
  "name": "Sender Name",
  "phone": "1234567890",
  "message": "This is the message content"
}
```

- Success response

```json
{
  "message": "Email sent successfully"
}
```

## Error Handling

The API includes basic error handling for missing environment variables and email sending errors. Errors are logged to the console for debugging purposes.

## Validation

The API uses `express-validator` to validate input fields. Here are the validation rules:

- `to` and `email` must be valid email addresses.
- `name` must be between 4 and 20 characters long.
- `phone` must be a valid phone number.
- `message` is required must be between 20 and 500 characters long.

## Author

<p align="left">

<a href="https://www.linkedin.com/in/ibrahim-ahmed-a8bba9196" target="_blank">![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)
</a>
<a href="https://www.facebook.com/ibrahim11ahmed" target="_blank">![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)
</a>
<a href="mailto:ibrahim11elian@gmail.com" target="_blank">![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)
</a>
<a href="tel:+201157676284" target="_blank">![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
</a>
<a href="https://www.instagram.com/ibrahim11ahmed/" target="_blank">![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)
</a>
<a href="https://twitter.com/ibrahim11elian" target="_blank">![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)
<a href="https://leetcode.com/ibrahim11elian" target="_blank">![LeetCode](https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=#d16c06)

</p>
