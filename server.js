const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
//const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) console.log(err);

        var notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = Math.floor(Math.random() * 10000);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err)console.log(err);

        var notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== parseInt(req.params.id));
        
        
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err, data) => {
            res.json({ msg: 'successful' });
        });
    });
});




app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});