const router = require('express').Router();
const fs = require('fs');
const path = require("path");
const { notes } = require('../../db/db.json');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

router.get("/notes", (req, res) => {
    let results = notes;
    res.json(results);
});

router.post("/notes", (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    res.json(note);
});



module.exports = router;