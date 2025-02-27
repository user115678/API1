const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/qdrant/jurisprudence_nationale/search', (req, res) => {
  try {
    const query = req.body.query || "";

    if (!query.trim()) {
      return res.status(400).json({ error: "La requête est vide" });
    }

    // Simuler des résultats de Qdrant (ordre non trié)
    let results = [
      { juridiction: "cour_cassation", titre: "Arrêt Cour de cassation 2023", resume: "Résumé pertinent.", score: 0.89 },
      { juridiction: "tribunal_premiere_instance", titre: "Jugement Tribunal 2024", resume: "Résumé pertinent.", score: 0.92 },
      { juridiction: "cour_appel", titre: "Arrêt Cour d'appel 2022", resume: "Résumé pertinent.", score: 0.85 },
      { juridiction: "cour_constitutionnelle", titre: "Arrêt Cour constitutionnelle", resume: "Résumé pertinent.", score: 0.80 },
    ];

    // Ordre de priorité des juridictions (les plus basses d'abord)
    const priorityOrder = {
      "tribunal_premiere_instance": 1,
      "cour_appel": 2,
      "cour_cassation": 3,
      "cour_constitutionnelle": 4
    };

    if (results.length > 1) {
      results.sort((a, b) => {
        // Trier par juridiction (priorité)
        if (priorityOrder[a.juridiction] !== priorityOrder[b.juridiction]) {
          return priorityOrder[a.juridiction] - priorityOrder[b.juridiction];
        }
        // Si même juridiction, trier par score décroissant
        return b.score - a.score;
      });
    }

    res.json({ result: results });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
