import { Router } from 'express';

/* Candidates */
import {
  CreateCandidate,
  CreateCandidateProcesses,
  GetCandidatesByProfile,
  GetSummonedCandidates,
} from './candidates'

// Rutas para los servicios de los Candidatos
const candidateRouter = Router();
const candidatesPath = '/candidates';

/* Candidates */
candidateRouter.post(`${candidatesPath}/create`, CreateCandidate);
candidateRouter.post(`${candidatesPath}/createCandProcesses`, CreateCandidateProcesses);
candidateRouter.get(`${candidatesPath}/getByProfile/:profileId`, GetCandidatesByProfile);
candidateRouter.get(`${candidatesPath}/summonedCandidates`, GetSummonedCandidates);

export { candidateRouter };