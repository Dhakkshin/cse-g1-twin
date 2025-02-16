const path = require('path');
const fs = require('fs').promises;

exports.getQuestions = async (req, res) => {
    try {
        const questionsPath = path.join(__dirname, '..', 'data', 'questions.json');
        const questionsData = await fs.readFile(questionsPath, 'utf8');
        res.json(JSON.parse(questionsData));
    } catch (error) {
        console.error('Error reading questions:', error);
        res.status(500).json({ error: 'Failed to load questions' });
    }
};
