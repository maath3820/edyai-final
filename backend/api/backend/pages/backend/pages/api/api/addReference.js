// backend/api/addReference.js

import prisma from '../../prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { reference } = req.body;

    try {
        // Sauvegarder la référence dans la base de données
        await prisma.reference.create({
            data: {
                text: reference,
                // Ajoutez d'autres champs si nécessaire
            },
        });

        res.status(200).json({ message: 'Reference added successfully' });
    } catch (error) {
        console.error('Error adding reference:', error);
        res.status(500).json({ message: 'An error occurred while adding the reference' });
    }
}
