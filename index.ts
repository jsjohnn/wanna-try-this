import 'dotenv/config';
import { app } from './src/app.js';
import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
