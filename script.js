document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                
                // Clear the form
                contactForm.reset();
            } else {
                alert('Please fill in all fields before submitting.');
            }
        });
    }
});
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DHARMIKgohil@2006',
    database: 'splitmate_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle sign-up form submission
app.post('/signup', (req, res) => {
    const { name, contact, email, password } = req.body;

    // Input validation (basic)
    if (!name || !contact || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Insert data into the database
    const sql = 'INSERT INTO users (name, contact, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, contact, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error.');
        }
        res.send('Sign-Up Successful!');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
