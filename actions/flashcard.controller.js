// controllers/flashcard.controller.js

const flashcardModel = require('../models/flashcard.model');

module.exports = {
    createFlashcard: async (req, res) => {
        const { question, answer } = req.body;
        try {
            const flashcard = await flashcardModel.createFlashcard(question, answer);
            res.json(flashcard);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
