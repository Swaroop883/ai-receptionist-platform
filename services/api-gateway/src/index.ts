import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware (The "Shields")
app.use(helmet()); 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 2. Database Connection (The "Memory")
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 3. Health Check Route (Standard Industry Practice)
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbStatus = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'active', 
      database: 'connected', 
      timestamp: dbStatus.rows[0].now 
    });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});