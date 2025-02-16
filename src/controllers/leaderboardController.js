const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, '..', 'data', 'leaderboard.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS leaderboard (
            name TEXT PRIMARY KEY,
            score INTEGER DEFAULT 0
        )`);
    }
});

exports.getLeaderboard = async (req, res) => {
    try {
        db.all(`SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 3`, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to load leaderboard' });
            }
            res.json(rows);
        });
    } catch (error) {
        console.error('Error reading leaderboard:', error);
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
};

exports.updateScore = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        db.run(`INSERT INTO leaderboard (name, score) 
                VALUES (?, 1) 
                ON CONFLICT(name) 
                DO UPDATE SET score = score + 1`, 
            [name], 
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to update score' });
                }
                
                // Get updated score
                db.get(`SELECT score FROM leaderboard WHERE name = ?`, [name], (err, row) => {
                    if (err) {
                        console.error('Error getting updated score:', err);
                        return res.status(500).json({ error: 'Failed to get updated score' });
                    }
                    
                    res.json({ 
                        success: true, 
                        message: `Score updated for ${name}`, 
                        name, 
                        newScore: row.score 
                    });
                });
            }
        );
    } catch (error) {
        console.error('Error in update-score:', error);
        res.status(500).json({ error: 'Failed to update score', details: error.message });
    }
};
