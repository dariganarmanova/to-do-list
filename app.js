const express = require('express');
const { connectToDatabase, collection } = require('./mongo');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
connectToDatabase();

app.get("/login", cors(), (req, res) => {
    // Placeholder for login route
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            res.json("exists");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        console.error(e);
        res.json("error");
    }
});

app.get("/signup", cors(), (req, res) => {
    // Placeholder for signup route
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    };
    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            res.json("exists");
        } else {
            await collection.insertMany([data]);
            res.json("notexist");
        }
    } catch (e) {
        console.error(e);
        res.json("error");
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8001");
});