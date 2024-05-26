import { Router } from 'express';

/* Tests */
import {
  CreateTest,
  GetTests,
  GetTestByProfile,
  CreateCandidateTest,
  GetWinningCandidates,
} from './tests'

// Rutas para los servicios de las Pruebas
const testRouter = Router();
const testsPath = '/tests';

/* Tests */
testRouter.post(`${testsPath}/create`, CreateTest);
testRouter.get(`${testsPath}/getAll`, GetTests);
testRouter.get(`${testsPath}/getByProfile/:profileId`, GetTestByProfile);
testRouter.post(`${testsPath}/createCandTest`, CreateCandidateTest);
testRouter.get(`${testsPath}/getWinners`, GetWinningCandidates);

export { testRouter };