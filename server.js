const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;

const app = next({
  dev,
  dir: process.cwd()
});

const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, 'certificates', 'localhost+2-key.pem')
  ),
  cert: fs.readFileSync(path.join(__dirname, 'certificates', 'localhost+2.pem'))
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, 'localhost', (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
