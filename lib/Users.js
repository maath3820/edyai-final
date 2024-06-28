// user.js
'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour récupérer le nombre de tokens d'un utilisateur
export const getTokenCount = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }, // Assurez-vous que userId est déjà une chaîne de caractères si votre modèle Prisma utilise des chaînes pour l'ID
    select: { token_count: true }
  })
  return user.token_count
}

// Fonction pour mettre à jour le nombre de tokens d'un utilisateur après utilisation
export const updateTokenCount = async (userId) => {
  await prisma.user.update({
    where: { id: userId }, // Assurez-vous que userId est déjà une chaîne de caractères si votre modèle Prisma utilise des chaînes pour l'ID
    data: { token_count: { decrement: 1 } }
  })
}
