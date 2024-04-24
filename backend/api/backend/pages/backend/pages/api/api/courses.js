// pages/api/courses.js

import prisma from '../../prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Récupérer tous les cours créés
      const createdCourses = await prisma.course.findMany();

      // Récupérer tous les cours téléchargés
      const downloadedCourses = await prisma.downloadedCourse.findMany();

      // Combinez les deux listes de cours
      const allCourses = [...createdCourses, ...downloadedCourses];

      res.status(200).json(allCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
