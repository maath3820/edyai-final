// pages/ReferenceForm.js

import React, { useState } from 'react';

const ReferenceForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/references', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, source }),
      });
      if (response.ok) {
        alert('Reference created successfully!');
      } else {
        throw new Error('Failed to create reference');
      }
    } catch (error) {
      console.error('Error creating reference:', error);
      alert('An error occurred while creating the reference.');
    }
  };

  return (
    <div>
      <h1>Add Reference</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReferenceForm;
