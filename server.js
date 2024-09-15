const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing and comparison

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DHARMIKgohil@2006',
  database: 'splitmate'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Sign-Up Route
app.post('/signup', (req, res) => {
  const { name, contact, email, password } = req.body;
  
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    // Insert user into database
    const sql = 'INSERT INTO users (name, contact, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, contact, email, hashedPassword], (err, result) => {
      if (err) throw err;
      res.send('User registered successfully!');
    });
  });
});

// Sign-In Route
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).send('Email not found.');
    }

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        res.redirect('/dashboard.html');
      } else {
        res.status(401).send('Invalid password.');
      }
    });
  });
});

// Serve HTML Files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup.html', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.get('/signin.html', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
