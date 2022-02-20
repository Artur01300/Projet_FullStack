const db = require('../db-connection/db');
const dbClient = db.client;

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/constructor
const Outlook = () => {}

// Outlook.saveUsersOutCalendarToMD = (calendar_id, type, data, res) => {
Outlook.saveUsersOutCalendarToMD = (type, data, res) => {
  try{
  //dbClient.db().collection("tokens").updateOne({calendar_id, type}, {$addToSet: {"calendars": data}},
    dbClient.db().collection("tokens").updateOne({type}, {$addToSet: {"calendars": data}},
    (err, result)=>{
      if(result.matchedCount){
        res.status(201).json({message: `${result.matchedCount} Stored `});
      }else{
        res.status(204).json({err: err, message: "outCalendar_id is false"});
      }
    });
  }catch(err){
    console.log(err);
    res.json(err.message);
  }
}

// Outlook.getAllResultsFromDB = (calendar_id) =>{
Outlook.getAllResultsFromDB = (type) =>{
  try{
    // return dbClient.db().collection("tokens").find({calendar_id: calendar_id, type: type}).toArray();
    return dbClient.db().collection("tokens").find({type: type}).toArray();
  }catch (err){
    console.log(err);
  }
}

// Outlook.pullUsersCalendarFromMD = (calendar_id, data, res) => {
Outlook.pullUsersOutCalendarFromMD = (type, data, res) => {
  try{
    // dbClient.db().collection("tokens").updateOne({calendar_id}, { $pull: data }, (err, delResult)=>{
    dbClient.db().collection("tokens").updateOne({type}, { $pull: data }, (err, delResult)=>{

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

module.exports = Outlook;