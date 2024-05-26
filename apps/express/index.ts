import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Routers
import { employeeRouter } from './employees';
import { requirementRouter } from './requirements';
import { profileRouter } from './profiles';
import { candidateRouter } from './candidates';
import { testRouter } from './tests';

const app = express();
const port = process.env.PORT ?? '3000';

app.use(express.json());
app.use(cors());
app.options('*', cors());

// Rutas de todos los servicios
app.use(employeeRouter, requirementRouter, profileRouter, candidateRouter, testRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});