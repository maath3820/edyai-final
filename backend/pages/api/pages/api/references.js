// pages/api/references.js

import prisma from '../../prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, author, source } = req.body;

    try {
      const newReference = await prisma.reference.create({
        data: {
          title,
          author,
          source,
        },
      });
      res.status(201).json(newReference);
    } catch (error) {
      console.error('Error creating reference:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
