const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', hostname: os.hostname() }));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Hello from container: ${os.hostname()}\n`);
});

if (require.main === module) {
    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

module.exports = server;