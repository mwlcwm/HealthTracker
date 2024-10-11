//Handle Get request
module.exports = function Get(app, db) {
    app.get('/', (re, res) => {
        return res.json("Hello World");
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
};