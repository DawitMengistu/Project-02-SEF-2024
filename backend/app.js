import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
import { getBooksInFolders } from './functions.js';
import { getAssistance } from './ai.js';

const PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('books'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let notes = [
    {
        title: "Chemistry | Chaper One",
        note: "1) The periodic table classifies elements by their atomic number and electron configuration. Elements in the same group have similar properties. \n\n" +
            "2) Across a period, elements gain electrons and show trends in electronegativity and ionization energy. These trends help in predicting chemical reactivity. \n\n" +
            "3) Metals, nonmetals, and metalloids occupy different regions of the periodic table, with metals on the left and nonmetals on the right."
    },
    {
        title: "Mathematics | Chaper Three",
        note: "1) Trigonometric identities, like sin²θ + cos²θ = 1, are crucial in simplifying trigonometric expressions. \n\n" +
            "2) These identities are often used to solve equations in calculus, physics, and engineering, where angles and waves are involved. \n\n" +
            "3) They also help in understanding the relationship between angles and distances in triangles."
    },
    {
        title: "Physics | | Chaper Four",
        note: "1) Newton's First Law explains that objects at rest stay at rest unless acted on by a force, and moving objects continue moving unless interrupted. \n\n" +
            "2) Newton's Second Law connects force, mass, and acceleration, with the formula F = ma. This law is used to calculate how much force is required to change an object's motion. \n\n" +
            "3) Newton's Third Law states that every action has an equal and opposite reaction, which explains the force pairs in interactions."
    }
];



app.get('/', (req, res) => {
    console.log("someone came here")
    res.send("Hello")
});


app.post('/', (req, res) => {
    console.log("someone came post here", req.body)
    res.json({ name: 'dawit' })
});


app.get("/booklist", (req, res) => {
    const bookList = getBooksInFolders("./books")
    res.json(bookList)
})


app.post("/savenotes", (req, res) => {
    const { note_title, note } = req.body.data;

    const existingNote = notes.find(n => n.title === note_title);

    if (existingNote) {

        existingNote.note = note;

        res.json({ message: "Note updated!" })
    } else {

        notes.push({
            title: note_title,
            note: note
        });
        res.json({ message: "Note saved!" })
    }

})


app.get("/notes", (req, res) => {
    res.json(notes)
})

app.post("/assistance", async (req, res) => {
    if (req.body.prompt) {
        const response = await getAssistance(req.body.prompt)
        res.json({ message: "success", response: response })
    } else {
        res.json({ message: "error", response: "something went wrong" })
    }
})



app.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});