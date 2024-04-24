// pages/SuggestedReferences.js

import React, { useEffect, useState } from 'react';

const SuggestedReferences = () => {
  const [suggestedReferences, setSuggestedReferences] = useState([]);

  useEffect(() => {
    // Fetch and display suggested references
    fetchSuggestedReferences();
  }, []);

  const fetchSuggestedReferences = async () => {
    try {
      // Fetch suggestions from OpenAI
      const openaiResponse = await fetch('/api/openai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'Your query here' }), // Ajoutez votre requête de recherche ici
      });
      const openaiData = await openaiResponse.json();

      // Fetch suggestions from Internet
      const internetResponse = await fetch('/api/internet-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'Your query here' }), // Ajoutez votre requête de recherche ici
      });
      const internetData = await internetResponse.json();

      // Combine and set the suggestions
      setSuggestedReferences([...openaiData, ...internetData]);
    } catch (error) {
      console.error('Error fetching suggested references:', error);
    }
  };

  return (
    <div>
      <h1>Suggested References</h1>
      <ul>
        {suggestedReferences.map((reference) => (
          <li key={reference.id}>
            <p>Title: {reference.title}</p>
            <p>Author: {reference.author}</p>
            <p>Source: {reference.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedReferences;
