const path = require('path');
const fs = require('fs').promises;

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboardPath = path.join(__dirname, '..', 'data', 'leaderboard.json');
        const leaderboardData = await fs.readFile(leaderboardPath, 'utf8');
        const data = JSON.parse(leaderboardData);
        
        const topScores = Object.entries(data.scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([name, score]) => ({ name, score }));
            
        res.json(topScores);
    } catch (error) {
        console.error('Error reading leaderboard:', error);
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
};

exports.updateScore = async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Received request to update score for:', name);

        if (!name) {
            console.log('No name provided in request');
            return res.status(400).json({ error: 'Name is required' });
        }

        const leaderboardPath = path.join(__dirname, '..', 'data', 'leaderboard.json');
        const leaderboardData = await fs.readFile(leaderboardPath, 'utf8');
        let data = JSON.parse(leaderboardData);
        
        if (!data.scores) {
            data.scores = {};
        }

        data.scores[name] = (data.scores[name] || 0) + 1;
        console.log(`Updated score for ${name} to ${data.scores[name]}`);
        
        await fs.writeFile(leaderboardPath, JSON.stringify(data, null, 2));
        
        res.json({ 
            success: true, 
            message: `Score updated for ${name}`, 
            name, 
            newScore: data.scores[name] 
        });
    } catch (error) {
        console.error('Error in update-score:', error);
        res.status(500).json({ error: 'Failed to update score', details: error.message });
    }
};
