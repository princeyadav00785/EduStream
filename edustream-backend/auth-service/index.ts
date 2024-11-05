import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { registerUser, loginUser } from './src/controllers/authController';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/auth/register', registerUser); // No need to cast again
app.post('/api/auth/login', loginUser); // No need to cast again

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Auth service is running on http://localhost:${PORT}`);
});
