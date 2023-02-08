const router = require('express').Router();

const jsonData = require('../db/db.json');

const { readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

router.post('/notes', (req, res) => {
    console.log(req.body)
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else {
        res.errored('Error in adding note');
    }
})

router.delete('/notes/:id', (req, res) => {
    console.log('hi');
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
  
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
})

module.exports = router;