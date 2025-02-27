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
        score: 0.9,
        payload: {
          titre_principal: "Arrêt exemple",
          titre_secondaire: "Cas juridique",
          resume: "Résumé de l'arrêt pertinent pour la recherche."
        }
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});