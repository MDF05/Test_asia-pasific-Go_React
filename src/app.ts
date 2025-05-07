import express from 'express';
import dotenv from 'dotenv';
import myClientRoutes from './routes/myClientRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/clients', myClientRoutes); 