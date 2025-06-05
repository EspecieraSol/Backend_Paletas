const express = require('express');
const { crearPreferencia, recibirNotificaciones, paymentMP } = require('../controllers/mercadopago');

const router = express.Router();

//router.post('/crear-preferencia', crearPreferencia);

//router.post('/notificaciones', recibirNotificaciones);

router.post('/crear-preferencia', paymentMP);

router.post('/webhooks/mercadopago', (req, res) => {
    console.log('Notificación recibida:', req.body);
    res.sendStatus(200); // Importante responder 200 OK
});


module.exports = router;