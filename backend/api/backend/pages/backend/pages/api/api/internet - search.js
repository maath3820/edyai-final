// pages/api/internet-search.js

import fetch from 'node-fetch';

const GOOGLE_SEARCH_API_KEY = 'VOTRE_CLE_API_GOOGLE'; // Remplacez par votre clé API Google
const GOOGLE_SEARCH_ENGINE_ID = 'VOTRE_ID_MOTEUR_DE_RECHERCHE_GOOGLE'; // Remplacez par l'ID de votre moteur de recherche Google

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`);
      const data = await response.json();

      res.status(200).json(data.items);
    } catch (error) {
      console.error('Error searching on the internet:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
