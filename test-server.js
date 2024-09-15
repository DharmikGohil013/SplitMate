const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/signup.html') {
        fs.readFile(path.join(__dirname, 'public', 'signup.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading file');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
