const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/embed', (req, res) => {
  // Simuler un embedding
  const embedding = Array(1536).fill(0).map(() => Math.random() - 0.5);
  res.json({ embedding });
});

app.post('/api/qdrant/:collection/search', (req, res) => {
  res.json({
    result: [
      {
        score: 0.95,
        payload: {
          titre_principal: "Tribunal de Première Instance de Bruxelles, 15 mars 2020",
          titre_secondaire: "Erreur matérielle dans la déclaration fiscale",
          resume: "Le tribunal a jugé que l'erreur matérielle évidente dans le calcul des charges professionnelles ne peut être considérée comme une tentative de fraude fiscale."
        }
      },
      {
        score: 0.92,
        payload: {
          titre_principal: "Cour d'Appel de Liège, 18 juin 2018",
          titre_secondaire: "Rectification d'erreur matérielle",
          resume: "La Cour a reconnu le droit du contribuable de faire rectifier une erreur matérielle dans sa déclaration après le délai légal lorsque les éléments factuels sont incontestables."
        }
      },
      {
        score: 0.85,
        payload: {
          titre_principal: "Cour de Cassation, arrêt F.14.0083.F",
          titre_secondaire: "Portée juridique des erreurs matérielles",
          resume: "La Cour de Cassation a confirmé le principe que les erreurs matérielles manifestes peuvent être corrigées même après l'établissement définitif de l'impôt."
        }
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});