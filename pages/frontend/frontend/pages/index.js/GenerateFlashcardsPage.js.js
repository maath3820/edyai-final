import React, { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('document', file);
    try {
      await axios.post('/api/flashcards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setError(null);
      alert('Flashcards generated successfully!');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      setError('Unable to generate flashcards');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Flashcards Generator</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default IndexPage;
