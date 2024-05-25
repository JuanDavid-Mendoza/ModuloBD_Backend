import { Router } from 'express';

/* Candidates */
import {
  CreateCandidate,
  GetCandidates,
} from './candidates'

const candidateRouter = Router();
const candidatesPath = '/candidates';

/* Candidates */
candidateRouter.post(`${candidatesPath}/create`, CreateCandidate);
candidateRouter.get(`${candidatesPath}/getAll`, GetCandidates);

export { candidateRouter };