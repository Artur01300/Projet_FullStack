const express = require('express');
require('dotenv').config();


const usersRoutesOauth2Calendar = require('./routes/google-services');
const usersRoutesOauthOutlook = require('./routes/outlook-services');
const usersRoutesCtrlCalendar = require('./routes/calendars');
const userRoutesCtrlOutlook = require('./routes/outlook');

const app = express();


//Pour éviter l'erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//d'envoyer des requêtes avec les méthodes mentionnées ( GET, POST, etc.).
    next();
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api', usersRoutesOauth2Calendar);
app.use('/out_redirect', usersRoutesOauthOutlook);
app.use('/api', usersRoutesCtrlCalendar);
app.use('/out_redirect', userRoutesCtrlOutlook);



module.exports = app;