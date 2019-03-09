const nodemailer = require('nodemailer');

async function send() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: '"Jonas Pohren" <contact@jonaspohren.com>',
    to: 'jonaspohren@gmail.com',
    subject: 'Hello!',
    html: '<b>Hello World!</b>'
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(info);
};

send().catch(err => console.error(err));