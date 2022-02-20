const Calendars = require('../models/Calendars');

exports.addCalendarName = ((req, res) => {

  //Encoding Base64 Strings with Node.js
  const cal_id = req.body.cal_id
  let buff = Buffer.from(cal_id);
  let base64data = buff.toString('base64');

  /**
   * to Decoding we use: Decoding Base64 Strings
      let buff = Buffer.from(cal_id, 'base64');
      let text = buff.toString('ascii');
      console.log(text)
    */

  const cal_name = req.body.cal_name;
  let objData = {};
  objData[base64data] = cal_name;

  Calendars.saveUsersCalendarToMD(req.body.calendar_id, objData, res);
});
  
exports.delCalendar = ((req, res) => {
  Calendars.getAllResultsFromDB(req.body.calendar_id, ()=>{})
  .then((results)=>{
    if(results.length === 0){
      res.status(204).json({message: "Calendar_id is false"});
    }
    else{
      const cal_name = req.body.cal_name;

        //Encoding Base64 Strings with Node.js
      const cal_id = req.body.cal_id
      let buff = Buffer.from(cal_id);
      let base64data = buff.toString('base64');
      let objData =  {
        calendars: {[base64data]: cal_name }
      } 
      Calendars.pullUsersCalendarFromMD(req.body.calendar_id, objData, res);
    }
  })
  .catch(err=>{
    console.log(err)
  });
});