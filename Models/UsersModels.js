// userModel.js
import {prismadb} from '@/lib/prismadb';

const createUser = async (userData) => {
  try {
    const newUser = await prismadb.user.create({
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
