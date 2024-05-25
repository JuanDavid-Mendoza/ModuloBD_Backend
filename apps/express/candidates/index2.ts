import { Router } from 'express';

/* Candidates */
import {
  CreateCandidate,
  UpdateCandidate,
  DeleteCandidateByPK,
  GetCandidates,
  GetCandidateByPK,
} from './crudCandidates2'

const candidateRouter = Router();
const candidatesPath = '/candidates';

/* Candidates */
candidateRouter.post(`${candidatesPath}/create`, CreateCandidate);
candidateRouter.put(`${candidatesPath}/update/:candidatePK`, UpdateCandidate);
candidateRouter.delete(`${candidatesPath}/delete/:candidatePK`, DeleteCandidateByPK);
candidateRouter.get(`${candidatesPath}/getAll`, GetCandidates);
candidateRouter.get(`${candidatesPath}/get/:candidatePK`, GetCandidateByPK);

export { candidateRouter };