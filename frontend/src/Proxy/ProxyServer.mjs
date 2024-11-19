import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';
import https from 'https';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const apiUrl = '<Поменять на наш бек>';

const staticProxy = createProxyMiddleware('/', {
    changeOrigin: true,
    target: 'http://0.0.0.0:3001/',
    secure: false,
})

const HMRProxy = createProxyMiddleware('/_next/webpack-hmr', {
    changeOrigin: true,
    target: 'http://0.0.0.0:3001/_next/webpack-hmr',
    logLevel: 'debug',
    secure: false,
    ws: true
})

const apiProxy = createProxyMiddleware(['/api'], {
    changeOrigin: true,
    secure: false,
    target: apiUrl,
    logLevel:'debug'
})

app.use(apiProxy);
app.use(HMRProxy);
app.use(staticProxy);

app.on('upgrade', HMRProxy.upgrade);
https.createServer({
    key: fs.readFileSync(path.join(__dirname, './key.key')),
    cert: fs.readFileSync(path.join(__dirname, './cert.crt')),
}, app).listen(443)


export default app;