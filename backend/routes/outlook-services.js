const express = require('express');
const router = express.Router();
const usersOutlook = require('../services/outlook-services');

router.get('/', usersOutlook.usersGetingToken);
router.get('/getToken', usersOutlook.getTokenFromMD);


module.exports = router;