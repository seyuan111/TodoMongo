const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 8000;
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`We are connecting you to ${dbName}`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(exxpress.static('public'))
app.use(express.urlencoded({extended: true}))
appp.use(express.json())