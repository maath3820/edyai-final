// pages/UploadCoursePage.js

import React, { useState } from 'react';
import { useSession } from 'next-auth/client';

const UploadCoursePage = () => {
  const [courseName, setCourseName] = useState('');
  const [file, setFile] = useState(null);
  const [session, loading] = useSession();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('courseFile', file);

    try {
      const response = await fetch('/api/upload-course', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert('Course uploaded successfully!');
      } else {
        throw new Error('Failed to upload course');
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('An error occurred while uploading the course.');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <div>Please sign in to upload a course.</div>;
  }

  return (
    <div>
      <h1>Upload Course</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCoursePage;
