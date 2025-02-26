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

app.post('/api/qdrant', (req, res) => {
  res.json({
    result: [
      {
        score: 0.9,
        payload: {
          titre_principal: "Arrêt Cour de Cassation - 27 Avril 2023",
          titre_secondaire: "Déductibilité des frais professionnels",
          resume: "La Cour a statué que les frais professionnels doivent présenter un lien direct avec l'activité professionnelle pour être déductibles."
        }
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});