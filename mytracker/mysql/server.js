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

app.post('/CLI_ACCOUNT', (req, res) => {
    const sql = "SELECT * FROM CLI_ACCOUNT WHERE username = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Login Failed");
        if(data.length > 0) return res.json("Login Successfully");
        else return res.json("Impossible to login. Email or password is incorrect");
    })

})

app.post('/MED_ACCOUNT', (req, res) => {
    const sql = "SELECT * FROM MED_ACCOUNT WHERE username = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Login Failed");
        if(data.length > 0) return res.json("Login Successfully");
        else return res.json("Impossible to login. Email or password is incorrect");
    })

})

app.get('/', (re, res) => {
    return res.json("From mysql side");
})

app.get('/bodyPartsAndMotifs', (req, res) => {
    const sql = `
        SELECT TITLE.ID AS title_id, TITLE.PARTIES, MOTIFS.ID AS motif_id, MOTIFS.MOTIF 
        FROM TITLE 
        LEFT JOIN MOTIFS ON TITLE.ID = MOTIFS.TITLE_ID
    `;
    db.query(sql, (err, results) => {
        if (err) return res.json(err);

        const bodyParts = {};

        results.forEach(row => {
            if (!bodyParts[row.title_id]) {
                bodyParts[row.title_id] = {
                    id: row.title_id,
                    part: row.PARTIES,
                    motifs: []
                };
            }

            if (row.MOTIF) {
                bodyParts[row.title_id].motifs.push({
                    id: row.motif_id,
                    motif: row.MOTIF
                });
            }
        });

        const bodyPartsArray = Object.values(bodyParts);
        return res.json(bodyPartsArray);
    });
});

app.post('/submitEntry', (req, res) => {
    const { date, intensity, additionalNotes, selectedMotifs } = req.body;

    const insertEntrySql = "INSERT INTO Entries (DATE, INTENSITÉ, PRÉCISIONS) VALUES (?, ?, ?)";
    
    db.query(insertEntrySql, [date, intensity, additionalNotes], (err, result) => {
        if (err) {
            console.error('Error inserting entry:', err);
            return res.status(500).json({ error: 'Failed to insert entry' });
        }

        const entryId = result.insertId;

        const motifInsertPromises = selectedMotifs.map(motif => {
            const insertMotifSql = "INSERT INTO Entry_Motifs (ENTRY_ID, MOTIF) VALUES (?, ?)";
            return new Promise((resolve, reject) => {
                db.query(insertMotifSql, [entryId, motif], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });

        Promise.all(motifInsertPromises)
            .then(() => res.status(201).json({ message: 'Entry submitted successfully!' }))
            .catch(err => {
                console.error('Error inserting motifs:', err);
                res.status(500).json({ error: 'Failed to insert motifs' });
            });
    });
});
app.get('/entries', (req, res) => {
    const sql = `
        SELECT e.ID, e.DATE, e.INTENSITÉ, e.PRÉCISIONS, GROUP_CONCAT(m.MOTIF) AS motifs
        FROM Entries e
        LEFT JOIN Entry_Motifs m ON e.ID = m.ENTRY_ID
        GROUP BY e.ID
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching entries:', err);
            return res.status(500).json({ error: 'Failed to fetch entries' });
        }
        res.json(results);
    });
});
app.get('/entries/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT e.ID, e.DATE, e.INTENSITÉ, e.PRÉCISIONS, GROUP_CONCAT(m.MOTIF) AS motifs
        FROM Entries e
        LEFT JOIN Entry_Motifs m ON e.ID = m.ENTRY_ID
        WHERE e.ID = ?
        GROUP BY e.ID
    `;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }
        return res.json(data[0]);
    });
});
app.put('/entries/:id', (req, res) => {
    const { id } = req.params;
    const { date, intensity, precisions, motifs } = req.body;

    const sqlUpdateEntry = `
        UPDATE Entries
        SET DATE = ?, INTENSITÉ = ?, PRÉCISIONS = ?
        WHERE ID = ?
    `;

    db.query(sqlUpdateEntry, [date, intensity, precisions, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const sqlDeleteMotifs = `DELETE FROM Entry_Motifs WHERE ENTRY_ID = ?`;
        db.query(sqlDeleteMotifs, [id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const sqlInsertMotifs = `INSERT INTO Entry_Motifs (ENTRY_ID, MOTIF) VALUES ?`;
            const motifValues = motifs.map(motif => [id, motif]);

            db.query(sqlInsertMotifs, [motifValues], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.json({ message: 'Entry updated successfully' });
            });
        });
    });
});
app.listen(8081, ()=> {
    console.log("listening...");
})