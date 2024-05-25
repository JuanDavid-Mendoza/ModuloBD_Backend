import { Router } from 'express';

/* Tests */
import {
  CreateTest,
  GetTests,
  GetTestByProfile,
} from './tests'

const testRouter = Router();
const testsPath = '/tests';

/* Tests */
testRouter.post(`${testsPath}/create`, CreateTest);
testRouter.get(`${testsPath}/getAll`, GetTests);
testRouter.get(`${testsPath}/getByProfile`, GetTestByProfile);

export { testRouter };