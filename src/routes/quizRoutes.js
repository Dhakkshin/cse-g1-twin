const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const leaderboardController = require('../controllers/leaderboardController');

// Quiz routes
router.get('/questions', quizController.getQuestions);

// Leaderboard routes
router.get('/leaderboard', leaderboardController.getLeaderboard);
router.post('/update-score', leaderboardController.updateScore);

// Form submission route
router.post('/submit-profile', require('../controllers/formController').submitProfile);

module.exports = router;
