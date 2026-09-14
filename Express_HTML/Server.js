import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Home
app.get('/', (req, res) => {
    fs.readFile('./pages/Index.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading Index.html");
            return;
        }

        res.send(data);
    });
});

// About
app.get('/About', (req, res) => {
    fs.readFile('./pages/About.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading About.html");
            return;
        }

        res.send(data);
    });
});

// Contact
app.get('/Contact', (req, res) => {
    fs.readFile('./pages/contact.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading contact.html");
            return;
        }

        res.send(data);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});