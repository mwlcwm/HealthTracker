Get = require('./Server/get_query');
Post = require('./Server/post_query');
Put = require('./Server/put_query');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthtrack_db'
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the db', err);
        return;
    }
    console.log('Connected to the database');
});
app.listen(8081, ()=> {
    console.log("listening...");
})

Get(app, db);
Post(app, db);
Put(app, db);
