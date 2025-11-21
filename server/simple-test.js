const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Royalty Studioz API is working!',
    timestamp: new Date().toISOString()
  });
});

// Test route for films
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API routes are working!',
    status: 'success'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Test the server by visiting: http://localhost:${PORT}/`);
});