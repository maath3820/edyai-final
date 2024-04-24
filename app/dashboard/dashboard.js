// pages/dashboard.js

import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import Progressor from '../composant/Progressor';

export default function Dashboard({ userDashboard }) {
  return (
    <div>
      {/* Affichez les informations du tableau de bord ici */}
      <h1>Tableau de bord</h1>
      <p>Nom de l'utilisateur : {userDashboard.username}</p>
      <p>Niveau de Progression : {userDashboard.progress}%</p>
      {/* D'autres informations */}
      <Progressor progress={userDashboard.progress} />
      {/* Autres éléments de tableau de bord */}
      <p>Statistiques : {userDashboard.statistics}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userDashboard = await prisma.userDashboard.findUnique({
    where: { userId: session.user.id },
  });

  return {
    props: {
      userDashboard: userDashboard || null,
    },
  };
}
