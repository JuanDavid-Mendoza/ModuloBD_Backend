import { Router } from 'express';

/* Candidates */
import {
  CreateCandidate,
  CreateCandidateProcesses,
  GetCandidates,
} from './candidates'

const candidateRouter = Router();
const candidatesPath = '/candidates';

/* Candidates */
candidateRouter.post(`${candidatesPath}/create`, CreateCandidate);
candidateRouter.post(`${candidatesPath}/createCandProcesses`, CreateCandidateProcesses);
candidateRouter.get(`${candidatesPath}/getAll`, GetCandidates);

export { candidateRouter };