const express = require('express');

const app = express();

const PORT = 3001;

const path = require('path');

const apiRoutes = require('./routes/routes');

const fs = require('fs');

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})