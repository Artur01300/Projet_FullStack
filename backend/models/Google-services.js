const db = require('../db-connection/db');
const dbClient = db.client;

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/constructor
const Tokens = () =>{}

Tokens.saveRefreshToken = (calendar_id, type, data) => {
    try{
        dbClient.db().collection("tokens").updateOne({calendar_id: calendar_id, type: type},{$set: data});
      }catch(err){
        console.log(err.MongoServerError);
    }
};

Tokens.getAllResultsFromDB = (calendar_id, type) => {
    try{
        return dbClient.db().collection("tokens").find({calendar_id: calendar_id, type: type}).toArray();
      }catch (err){
        console.log(err);
    }
}

Tokens.insertDataToDB = (data, res) => {
    try{
        dbClient.db().collection("tokens").insertOne(data, (err)=>{
            if(err){
                res.status(501).json({err: err, message: "Your access token is already created !"});
            }else{
                res.status(201).json({message: 'Your access token is retrieved!'});
            }
        });
    }catch(e){
        res.status(501).json({err: e});
    }
}


module.exports = Tokens;