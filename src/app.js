import express from "express";
import conn from "./config/conn.js";
import path from "path";
const port = 3021;
const app = express();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.json());
// app.use(express.static(__dirname)); // puxa o arquivo CSS 
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html")); // puxa o HTML
    
});

const Schema = conn.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number
});

const User = conn.model("User", userSchema);

app.post("/post", async (req, res) => {
    console.log(req.body);
    try {
        const {name, email, age} = req.body;
        const user = new User({
            name,
            email,
            age
        });
        await user.save();
        res.send("Enviado com sucesso");
        // console.log(user)
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
});

app.listen(port, () => console.log("Server running at port", port));
