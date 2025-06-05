const nodemailer = require('nodemailer');

// Configuración del transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes cambiar esto a otro servicio de correo si es necesario
    auth: {
        user: process.env.EMAIL_ADMIN, // Tu dirección de correo
        pass: process.env.EMAIL_PASS,  // Contraseña de tu correo
    },
    tls: {
        rejectUnauthorized: false, // Permitir certificados autofirmados
    },
});

module.exports = transporter;