const db = require('../db-connection/db');
const dbClient = db.client;

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/constructor
const Calendars = () => {}


Calendars.saveUsersCalendarToMD = (calendar_id, data, res) => {
  try{
    dbClient.db().collection("tokens").updateOne({calendar_id}, {$addToSet: {"calendars": data}},
    (err, result)=>{

      if(result.matchedCount){
        res.status(201).json({message: `${result.matchedCount} Stored `});
      }else{
        res.status(204).json({err: err, message: "Calendar_id is false"});
      }
    });
  }catch(err){
    console.log(err);
    res.json(err.message);
  }
}

Calendars.getAllResultsFromDB = (calendar_id) =>{
  try{
    return dbClient.db().collection("tokens").find({calendar_id: calendar_id}).toArray();
  }catch (err){
    console.log(err);
  }
}

Calendars.pullUsersCalendarFromMD = (calendar_id, data, res) => {
  try{
    dbClient.db().collection("tokens").updateOne({calendar_id}, { $pull: data }, (err, delResult)=>{
      if(delResult.matchedCount && delResult.modifiedCount){
        res.status(201).json({message: "Stored"});
      }else{
        res.status(204).json({err: err, message: "The information on the calendars is not correct"});
      }
    });
  }catch(err){
    console.log(err);
    res.json(err.message);
  }
}

module.exports = Calendars;