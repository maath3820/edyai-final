// models/flashcard.model.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createFlashcard: async (question, answer) => {
        try {
            const flashcard = await prisma.flashcard.create({
                data: {
                    question,
                    answer,
                },
            });
            return flashcard;
        } catch (error) {
            throw new Error('Could not create flashcard');
        }
    },
};
