import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
import { getBooksInFolders } from './functions.js';

const PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('books'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


app.get("/books", (req, res)=> {

})



app.listen(PORT, () => {
    console.log('server running at localhost:' + PORT);
});