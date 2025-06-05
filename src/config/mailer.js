const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Configura tus credenciales y el refresh token obtenido
const CLIENT_ID = '762457120072-v8a5ga3qk66ldlc30o0c4c04f2jugsqp.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//0hNOYD2BTACUKCgYIARAAGBESNwF-L9IroHVeSS_RKuN0yo83qxxIHCs-f1gcHKaKTiuZKDLn69o0AcYTBDbZOTuECFUTH8NJcBs';

// Crea un objeto de OAuth2 usando tus credenciales
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Establece el refresh token
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// Obtén un access token utilizando el refresh token
async function sendEmail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        // Crea un transportador de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ppatopadel@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, // El token de acceso obtenido
            },
            tls: {
              rejectUnauthorized: false,  // Deshabilita la validación de certificados
            },
        });

        // Configura el correo a enviar
        const mailOptions = {
            from: 'TU_EMAIL@gmail.com',
            to: 'fmarcos_23@hotmail.com',
            subject: 'Correo de prueba',
            text: '¡Hola! Este es un correo de prueba enviado mediante Nodemailer con OAuth2.',
        };

        // Envía el correo
        const result = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ', result);
    } catch (error) {
        console.log('Error al enviar el correo:', error);
    }
}

sendEmail();
