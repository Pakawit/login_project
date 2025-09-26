const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_login'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to mysql database:', err);
        return;
    }
    console.log('mysql successfully connected');
});

//login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM userlogin WHERE username = ?';

    db.query(sql, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'server error' });
        }
        if (!user || user.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        console.log(password);
        console.log(user[0].password);
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    });
});


//register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO userlogin (username, password) VALUES (?, ?)';

    db.query(sql, [username, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

