const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '🎬 Royalty Studioz Simple Server Working!',
    status: 'SUCCESS',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    films: [
      {
        title: "The Hope",
        embedUrl: "https://www.youtube.com/embed/x0SfNn0kzMo",
        description: "Your film is ready!"
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING on http://localhost:${PORT}`);
  console.log(`🎬 Test it: http://localhost:${PORT}/`);
  console.log(`📺 Films: http://localhost:${PORT}/api/test`);
});