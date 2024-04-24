// authController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (userData) => {
  try {
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la création du compte utilisateur');
  }
};

module.exports = {
  createUser,
};
// authController.js
const loginUser = async (credentials) => {
    // Logique de connexion
  };
  
  module.exports = {
    loginUser,
  };
  