import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import config, { checkEnvVariables } from './config';
import routes from './routes';

dotenv.config();
checkEnvVariables();

const app = express();
app.use(
  cors({
    origin: config.client.url,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SECRET,
    secure: process.env.NODE_ENV === 'production',
  })
);
app.use('/api/v1', routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
