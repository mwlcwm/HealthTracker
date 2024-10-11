//Handle Put request
module.exports = function Put(app, db) {
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
};