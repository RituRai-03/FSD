const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Middleware to serve static files (HTML, CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Optional custom route for API or tracking
app.get('/api/info', (req, res) => {
    res.json({ message: "Portfolio server is active" });
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});