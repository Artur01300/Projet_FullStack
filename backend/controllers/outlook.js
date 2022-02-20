const Outlook = require('../models/Outlook');

exports.addOutCalendarName = ((req, res) => {
  const cal_id = req.body.cal_id
  const cal_name = req.body.cal_name;

  let objData = {};
  objData[cal_id] = cal_name;

  // Outlook.saveUsersCalendarToMD(req.body.calendar_id, req.body.type, objData, res);
  Outlook.saveUsersOutCalendarToMD(req.body.type, objData, res);
});

exports.delOutCalendar = ((req, res) => {
  // Calendars.getAllResultsFromDB(req.body.calendar_id, ()=>{})
  Outlook.getAllResultsFromDB(req.body.type, ()=>{})
  .then((results)=>{
    if(results.length === 0){
      res.status(204).json({message: "outCalendar_id is false"});
    }
    else{
      const cal_name = req.body.cal_name;
      const cal_id = req.body.cal_id
  
      let objData =  {
        calendars: {[cal_id]: cal_name}
      } 
      // Calendars.pullUsersCalendarFromMD(req.body.calendar_id, objData, res);
      Outlook.pullUsersOutCalendarFromMD(req.body.type, objData, res);
    }
  })
  .catch(err=>{
    console.log(err)
  });
});