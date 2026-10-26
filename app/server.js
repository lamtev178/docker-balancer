const http = require('http')
const appName = process.env.APP_NAME || "unknown";

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
	res.end(`Hello from container: ${appName}\n`);
});

server.listen(3000, () => { 
	console.log('Server running on port 3000');
});
