//Handle Post request
module.exports = function Post(app, db) {
    app.post('/CLI_ACCOUNT', (req, res) => {
        const sql = "SELECT * FROM CLI_ACCOUNT WHERE username = ? AND password = ?";
        db.query(sql, [req.body.email, req.body.password], (err, data) => {
            if (err) return res.json("Login Failed");
            if(data.length > 0) return res.json("Login Successfully");
            else return res.json("Impossible to login. Email or password is incorrect");
        });
    });

    app.post('/MED_ACCOUNT', (req, res) => {
        const sql = "SELECT * FROM MED_ACCOUNT WHERE username = ? AND password = ?";
        db.query(sql, [req.body.email, req.body.password], (err, data) => {
            if (err) return res.json("Login Failed");
            if(data.length > 0) return res.json("Login Successfully");
            else return res.json("Impossible to login. Email or password is incorrect");
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
};