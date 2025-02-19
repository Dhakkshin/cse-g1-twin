const fs = require('fs').promises;
const path = require('path');

exports.submitProfile = async (req, res) => {
    try {
        const { name, email, uniqueDetails } = req.body;
        
        // Simply return success response
        res.json({
            success: true,
            message: `Thank you ${name}! Your profile has been submitted for review. We'll add you to the character list soon.`
        });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({
            success: false,
            message: "Sorry, there was an error processing your submission. Please try again later."
        });
    }
};
