const test = require('node:test');
const assert = require('node:assert/strict');

const { startServer } = require('../server');

test('startServer boots the API and serves the health endpoint', async () => {
  const server = await startServer(0);
  const address = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'Dakhilaa API');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
});
