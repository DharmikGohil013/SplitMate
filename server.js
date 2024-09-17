const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (e.g., form data)
app.use(express.urlencoded({ extended: true }));

// Use express-session for session management
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Other routes here, like Google OAuth routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
  