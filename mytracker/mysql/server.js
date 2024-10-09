const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

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

app.get('/', (re, res) => {
    return res.json("From mysql side");
})

app.get('/Formulaire', (req, res) => {
    const sql = "SELECT * FROM `Formulaire`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
app.listen(8081, ()=> {
    console.log("listening...");
})