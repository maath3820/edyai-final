// user.js
'use server'
import {prismadb} from '@/lib/prismadb';

// Fonction pour récupérer le nombre de tokens d'un utilisateur
export const getTokenCount = async (userId) => {
  const user = await prismadb.user.findUnique({
    where: { id: userId },
    select: { token_count: true }
  })
  return user.token_count
}

// Fonction pour mettre à jour le nombre de tokens d'un utilisateur après utilisation
export const updateTokenCount = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { token_count: { decrement: 1 } }
  })
}
