import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { todoRouter } from './routes/index.js';
import { connectDB } from './db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Middlerwares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Routes
app.use('/api/todos', todoRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
