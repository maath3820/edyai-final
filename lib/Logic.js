// Dans un fichier tutoratController.js
const getTutoringResponse = (question) => {
    // Logique pour interroger l'IA et obtenir une réponse
    return 'Réponse de l\'IA';
  };
  
  const tutoringController = (req, res) => {
    const { question } = req.body;
    const response = getTutoringResponse(question);
    res.json({ response });
  };
  
  module.exports = tutoringController;
  