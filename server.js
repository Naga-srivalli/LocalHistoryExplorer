const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve Frontend static files from /frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Route to serve cities.json
app.get('/api/cities', (req, res) => {
  const filePath = path.join(__dirname, 'cities.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading city data");
    }
    try {
      const cities = JSON.parse(data);
      res.json(cities);
    } catch (parseErr) {
      res.status(500).send("Error parsing city data");
    }
  });
});

// For any other route, serve index.html (React App)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

