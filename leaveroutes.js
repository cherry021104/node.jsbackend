const express = require('express');
const db = require('./db'); // Import MySQL connection

const router = express.Router(); // Initialize Router

// Apply for Leave Route
router.post('/apply-leave', (req, res) => {
    const { userId, type, startDate, endDate } = req.body;

    db.query('SELECT casual_leave, medical_leave FROM users WHERE id = ?', [userId], (err, results) => {
        if (err || results.length === 0) return res.send('User not found');

        let leaveBalance = results[0][`${type}_leave`];

        if (leaveBalance <= 0) return res.send('Insufficient leave balance');

        db.query(
            'INSERT INTO leaves (user_id, type, start_date, end_date) VALUES (?, ?, ?, ?)',
            [userId, type, startDate, endDate],
            (err) => {
                if (err) return res.send('Error applying leave');

                db.query(
                    `UPDATE users SET ${type}_leave = ${type}_leave - 1 WHERE id = ?`,
                    [userId]
                );

                res.send('Leave applied successfully');
            }
        );
    });
});

// Export the router
module.exports = router;
