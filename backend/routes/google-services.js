const express = require('express');
const router = express.Router();
const users_oauth2Google_calendar = require('../services/google-services');


router.get('/', users_oauth2Google_calendar.getUserTokenFromGoogle);
router.get('/tokenFromMD', users_oauth2Google_calendar.getUserTokenFromMD);


module.exports = router; 