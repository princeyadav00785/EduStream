import express from 'express';
import bodyParser from 'body-parser';
import notificationRoutes from './routes/notificationRoutes';

const app = express();
const PORT = process.env.PORT || 4002;

app.use(bodyParser.json());
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Notification Service running on http://localhost:${PORT}`);
});
