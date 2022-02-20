require('dotenv').config();
const fetch = require ( 'node-fetch' );
const Tokens = require('../models/Outlook-services');

const url = process.env.OAUTH_AUTHORITY;
const client_id = process.env.OAUTH_CLIENT_ID;
const client_secret = process.env.OAUTH_CLIENT_SECRET;
const scope = process.env.OAUTH_SCOPES;
const redirect_uri = process.env.OAUTH_REDIRECT_URI;

exports.usersGetingToken = ((req, res) => {
  const code = req.query.code;

  const body = `
    code=${code}&
    client_id=${client_id}&
    client_secret=${client_secret}&
    grant_type=authorization_code&
    scope=${scope}&
    redirect_uri=${redirect_uri}
  `;

  fetch(url, {
    method: 'POST',
    body,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
  .then(res => res.json())
  .then(token => {

    const timeNow = Math.floor(new Date() / 1000);
    const expires_at = timeNow + 86340; //86340 = 23:59:00

    //the refresh token expires after 24 hours
    //expires_in: Access token validity period (in seconds)
    //ext_expires_in: The expiration time of the access token. This value is used to determine the lifetime of cached tokens.
    const userToken = {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      id_token: token.id_token,
      expires_in: token.expires_in,
      ext_expires_in: token.ext_expires_in,
      expires_at: expires_at,
      type: 'Outlook',
      // state: ????
    }
    Tokens.insertDataToDB(userToken, res);
  })
  .catch(err=>{
    console.log(err)
  });
});

exports.getTokenFromMD = ((req, res) => {

  Tokens.getAllResultsFromDB(req.body.type, ()=>{})
  .then((results)=>{
    if(results.length === 0){
        res.status(204).json({message: "State is false"});
      }
      else{
        //We check if axpires_et is exceeded then we refresh the token
        const timeNow = Math.floor(new Date() / 1000);
        const getExpires_at = results[0].expires_at;
        
        if(getExpires_at < timeNow){

          const body = `
            client_id=${client_id}&
            scope=${scope}&
            redirect_uri=${redirect_uri}&
            grant_type=refresh_token&
            refresh_token=${results[0].refresh_token}&
            client_secret=${client_secret}&
          `;

          fetch(url, {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(res => res.json())
          .then(token => {

            const timeNow = Math.floor(new Date() / 1000);
            const expires_at = timeNow + 86340;

            const userToken = {
              expires_at: expires_at,
              access_token: token.access_token
            }
            Tokens.saveRefreshToken(req.body.type, userToken);
            // Tokens.saveRefreshToken(req.body.state, req.body.type, userToken);
            res.status(201).json({access_token: results[0].access_token, type:results[0].type, state: results[0].state});
          });
        }
        else{
          res.status(201).json({access_token: results[0].access_token, type:results[0].type, state: results[0].state});
        }
      }
    })
    .catch(err=>{
      console.log(err)
  });
});