const express = require('express');
const router = express.Router();
const usersCtrlCalendar = require('../controllers/calendars');

router.get('/calendars', usersCtrlCalendar.addCalendarName);
router.delete('/calendars', usersCtrlCalendar.delCalendar); 

module.exports = router; 