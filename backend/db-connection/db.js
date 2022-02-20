const {MongoClient} = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.plf6p.mongodb.net/${process.env.DB_Database}?retryWrites=true&w=majority`;
const client = new MongoClient(url);
client.connect();

module.exports.client = client;

