require('dotenv').config();
const fetch = require ( 'node-fetch' );
const credentials = JSON.parse(process.env.CREDENTIALS);
const Tokens = require('../models/Google-services');

//get user token form google after Auth end stor to the MongoDB
exports.getUserTokenFromGoogle = ((req, res)=>{

  //Retrieving the googleClientCode to pass our postData
  const code = req.query.code;
  
  //Retrieving the googleCalendar_id to save in MongoDB
  const calendar_id = req.query.state;

  const tokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
  const postData = {
    code: code,
    client_id: credentials.local.client_id,
    client_secret: credentials.local.client_secret,
    grant_type: 'authorization_code',
    redirect_uri: "http://localhost:8080/api"
  }
  
  fetch(tokenUrl, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(token => {

    //We convert the time in seconds adding the expiration time retrieved from googleAPI
    const timeNow = Math.floor(new Date() / 1000);
    const expires_at = timeNow + token.expires_in;
    
    const userToken = {
      access_token: token.access_token,
      expires_at: expires_at,
      refresh_token: token.refresh_token,
      type: "google",
      calendar_id: calendar_id.slice(12)
    }
    Tokens.insertDataToDB(userToken, res);
  });
});

//get user Token end all calendars by calender_id from MongoDB
exports.getUserTokenFromMD = ((req, res) => {

  Tokens.getAllResultsFromDB(req.body.calendar_id, req.body.type, ()=>{})
  .then((results)=>{
    if(results.length === 0){
      res.status(204).json({message: "Calendar_id is false"});
    }
    else{
      //We check if axpires_et is exceeded then we refresh the token
      const timeNow = Math.floor(new Date() / 1000);
      const getExpires_at = results[0].expires_at;
      
      if(getExpires_at < timeNow){
        const tokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
        const postNewData = {
          client_id: credentials.local.client_id,
          client_secret: credentials.local.client_secret,
          redirect_uri: "http://localhost:8080/api",
          refresh_token: results[0].refresh_token,
          grant_type: 'refresh_token'
        }
        fetch(tokenUrl, {
          method: 'POST',
          body: JSON.stringify(postNewData),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(token => {
          const expires_at = timeNow + token.expires_in;
          const userToken = {
            expires_at: expires_at,
            access_token: token.access_token
          }
          Tokens.saveRefreshToken(req.body.calendar_id, req.body.type, userToken);
          res.status(201).json({access_token: results[0].access_token, type:results[0].type, calendar_id: results[0].calendar_id});
        });
      }
      else{
        res.status(201).json({access_token: results[0].access_token, type:results[0].type, calendar_id: results[0].calendar_id});
      }
    }
  })
  .catch(err=>{
    console.log(err)
  });
});