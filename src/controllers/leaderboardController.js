const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
    try {
        const scores = await Leaderboard.find()
            .sort({ score: -1 })
            .limit(3)
            .select('name score -_id');
        
        res.json(scores);
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

        const result = await Leaderboard.findOneAndUpdate(
            { name },
            { $inc: { score: 1 }, lastUpdated: Date.now() },
            { new: true, upsert: true }
        );
        
        res.json({ 
            success: true, 
            message: `Score updated for ${name}`, 
            name: result.name, 
            newScore: result.score 
        });
    } catch (error) {
        console.error('Error in update-score:', error);
        res.status(500).json({ error: 'Failed to update score' });
    }
};
