const express = require('express');
const db = require('./db');
const authRoutes = require('./authRoutes');
const leaveRoutes = require('./leaveroutes');

const app = express();
app.use(express.urlencoded({ extended: true })); // Handle form data

app.use('/auth', authRoutes);
app.use('/leave', leaveRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
