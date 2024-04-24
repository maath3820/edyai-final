// pages/api/search-local.js

import prisma from '../../prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;

    try {
      const searchResults = await prisma.reference.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { author: { contains: query } },
            { source: { contains: query } },
          ],
        },
      });

      res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error searching local references:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
