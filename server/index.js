import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import pg from "pg";

const app = express();
const port = 3000;

// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "permalist",
//     password: "rohansaypika",
//     port: 5432,
// });
// db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.send(<h1>Hello World!</h1>)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
