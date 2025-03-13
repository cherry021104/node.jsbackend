const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');

const router = express.Router();
router.use(express.urlencoded({ extended: true })); // Handle form data

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                return res.send('Error registering user');
            }
            res.send('User registered successfully');
        }
    );
});

module.exports = router;
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) return res.send('User not found');

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.send('Invalid credentials');

        res.send(`Welcome ${user.name}`);
    });
});
