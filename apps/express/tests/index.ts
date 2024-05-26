import { Router } from 'express';

/* Tests */
import {
  CreateTest,
  GetTests,
  GetTestByProfile,
  CreateCandidateTest,
} from './tests'

const testRouter = Router();
const testsPath = '/tests';

/* Tests */
testRouter.post(`${testsPath}/create`, CreateTest);
testRouter.get(`${testsPath}/getAll`, GetTests);
testRouter.get(`${testsPath}/getByProfile/:profileId`, GetTestByProfile);
testRouter.post(`${testsPath}/createCandTest`, CreateCandidateTest);

export { testRouter };