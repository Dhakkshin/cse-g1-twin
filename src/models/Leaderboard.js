const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
