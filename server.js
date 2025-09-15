require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { nombres, apellidos, email, empresa, pais, mensaje } = req.body;

  if (!nombres || !apellidos || !email || !pais || !mensaje) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"${nombres} ${apellidos}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de contacto - ${nombres} ${apellidos}`,
    text: `
Nombre: ${nombres} ${apellidos}
Email: ${email}
Empresa: ${empresa || 'N/A'}
País: ${pais}
Mensaje: ${mensaje}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    res.status(200).json({ success: true, message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ success: false, message: 'Error enviando correo: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
