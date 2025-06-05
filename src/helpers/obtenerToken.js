const { google } = require("googleapis");
const readline = require("readline");

const CLIENT_ID = "762457120072-v8a5ga3qk66ldlc30o0c4c04f2jugsqp.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generar URL de autenticación
const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://mail.google.com/"],
});

console.log("Abre este enlace en tu navegador:", authUrl);

// Leer código de autorización
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Introduce el código de autorización: ", async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tu Refresh Token es:", tokens.refresh_token);
    rl.close();
});
