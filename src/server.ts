import express from 'express';
import dotenv from 'dotenv';
import router from './app.routes';
import connect_db from './core/database';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect_db();

const prot = process.env.PORT || 8000;

app.use('/api/v1', router);

app.listen(prot, () => {
  console.log(`server is running on ${prot}`);
});
