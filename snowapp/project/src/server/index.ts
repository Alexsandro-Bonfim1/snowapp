import express from 'express';
import cors from 'cors';
import { json } from 'express';
import databaseRoutes from './routes/database.routes';
import warehouseRoutes from './routes/warehouse.routes';
import connectionRoutes from './routes/connection.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

// Routes
app.use('/api/databases', databaseRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/connection', connectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});