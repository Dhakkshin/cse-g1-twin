const fs = require('fs').promises;
const path = require('path');

exports.submitProfile = async (req, res) => {
    try {
        const { name, email, uniqueDetails } = req.body;
        const detailsPath = path.join(__dirname, '..', 'data', 'details.txt');
        
        // Format the new entry
        const newEntry = `\n\n${name.toLowerCase()} - ${uniqueDetails}`;
        
        // Append to file
        await fs.appendFile(detailsPath, newEntry);
        
        res.json({
            success: true,
            message: "Thank you for your submission! Your profile will be reviewed and added to the character list soon."
        });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({
            success: false,
            message: "Sorry, there was an error processing your submission. Please try again later."
        });
    }
};
