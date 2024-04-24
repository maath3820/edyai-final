// pages/api/downloaded-courses.js

import prisma from '../../prisma';

export default async function handler(req, res) {
  try {
    // Récupérer tous les cours téléchargés depuis la base de données
    const downloadedCourses = await prisma.downloadedCourse.findMany();

    // Retourner les cours téléchargés en tant que réponse
    res.status(200).json(downloadedCourses);
  } catch (error) {
    console.error('Error fetching downloaded courses:', error);
    res.status(500).json({ message: 'An error occurred while fetching downloaded courses' });
  }
}
