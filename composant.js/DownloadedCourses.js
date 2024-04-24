// components/DownloadedCourses.js

import React, { useState, useEffect } from 'react';

const DownloadedCourses = () => {
  const [downloadedCourses, setDownloadedCourses] = useState([]);

  useEffect(() => {
    fetchDownloadedCourses();
  }, []);

  const fetchDownloadedCourses = async () => {
    try {
      const response = await fetch('/api/downloaded-courses');
      const data = await response.json();
      setDownloadedCourses(data);
    } catch (error) {
      console.error('Error fetching downloaded courses:', error);
    }
  };

  return (
    <div>
      <h2>Downloaded Courses</h2>
      <ul>
        {downloadedCourses.map(course => (
          <li key={course.id}>
            <p>Name: {course.fileName}</p>
            <p>File Path: {course.filePath}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadedCourses;
