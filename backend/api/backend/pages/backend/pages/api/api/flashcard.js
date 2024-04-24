
'use server'
import { PrismaClient } from '@prisma/client';
import natural from 'natural';

const prisma = new PrismaClient();
const tokenizer = new natural.WordTokenizer();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { question, answer } = req.body;

      // Logique pour générer les flashcards avec IA
      const extractedData = extractDataFromCourse(question, answer);
      const flashcard = await prisma.flashcard.create({
        data: {
          question: extractedData.question,
          answer: extractedData.answer,
        },
      });
      res.status(201).json(flashcard);
    } catch (error) {
      console.error('Error creating flashcard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function extractDataFromCourse(question, answer) {
  // Logique pour extraire les données pertinentes des cours et générer les flashcards
  // Ici, nous supposons que question et answer contiennent les données de cours
  // Nous utilisons une bibliothèque NLP comme exemple de traitement des données
  const tokens = tokenizer.tokenize(question + ' ' + answer);
  // Exemple: Extraire les entités nommées, les phrases clés, etc.
  const extractedQuestion = ''; // Logique pour extraire la question
  const extractedAnswer = ''; // Logique pour extraire la réponse
  return { question: extractedQuestion, answer: extractedAnswer };
}
