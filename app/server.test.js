const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const server = require('./server');

// Запускаем сервер на случайном порту для тестов
let testServer;
let port;

test.before(() => {
    return new Promise((resolve) => {
        testServer = server.listen(0, () => {
            port = testServer.address().port;
            resolve();
        });
    });
});

test.after(() => {
    testServer.close();
});

test('GET /health returns 200 and status OK', () => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/health`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    assert.strictEqual(res.statusCode, 200);
                    const json = JSON.parse(data);
                    assert.strictEqual(json.status, 'OK');
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
});

test('GET / returns 200 and Hello message', () => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    assert.strictEqual(res.statusCode, 200);
                    assert.match(data, /Hello from container/);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
});
