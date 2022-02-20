const express = require('express');
const router = express.Router();
const usersCtrlOutlook = require('../controllers/outlook');

router.get('/outlook', usersCtrlOutlook.addOutCalendarName);
router.delete('/outlook', usersCtrlOutlook.delOutCalendar);

module.exports = router; 