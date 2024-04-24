// pages/api/openai-search.js

import openai from 'openai';

const openaiApiKey = 'VOTRE_CLE_API_OPENAI'; // Remplacez par votre clé API OpenAI

const openaiClient = new openai.OpenAiApi(openaiApiKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const response = await openaiClient.search({
        documents: ['Document 1', 'Document 2', 'Document 3'], // Ajoutez vos documents OpenAI ici
        query: query,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error searching with OpenAI:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
