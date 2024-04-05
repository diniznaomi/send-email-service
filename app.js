const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/send-email', (req, res) => {
  const { name, email, city, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: process.env.PERSONAL_EMAIL,
      subject: subject,
      text: `Nome: ${name}\nEmail: ${email}\nCidade: ${city}\n\n${message}`
    }
  )
  .then(() => console.log('Email enviado'))
  .catch((err) => console.log(err))
})


// Iniciar o servidor
// run: node app.js
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});