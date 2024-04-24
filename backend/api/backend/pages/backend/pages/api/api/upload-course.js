// pages/api/upload-course.js

import formidable from 'formidable';
import fs from 'fs';
import prisma from '../../prisma';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });

  // Check if user is authenticated
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    const { courseName, courseId } = fields;
    const { courseFile } = files;

    // Save metadata to database using Prisma
    try {
      const course = await prisma.course.create({
        data: {
          name: courseName,
          author: session.user.name,
          fileType: courseFile.type,
          fileSize: courseFile.size,
          userId: session.user.id, // Associate the course with the user
          // Add other metadata fields here
        },
      });

      // Move the uploaded file to a permanent location
      const oldPath = courseFile.path;
      const newPath = `path/to/uploads/${course.id}.${courseFile.type.split('/')[1]}`;
      fs.renameSync(oldPath, newPath);

      // Enregistrer les informations du cours téléchargé dans la base de données
      try {
        const downloadedCourse = await prisma.downloadedCourse.create({
          data: {
            fileName: courseName,
            filePath: newPath,
            courseId: courseId,
          },
        });
        res.status(200).json({ message: 'Course uploaded and downloaded successfully' });
      } catch (error) {
        console.error('Error downloading course:', error);
        res.status(500).json({ message: 'An error occurred while downloading the course' });
      }
    } catch (error) {
      console.error('Error saving course:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  });
}
