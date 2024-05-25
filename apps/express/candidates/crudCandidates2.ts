import { Request, Response } from 'express';
import { CrudCandidatesApp } from '../../../src/candidates2/app/crudCandidates.app';

const CreateCandidate = async (req: Request, res: Response) => {
  try {
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const UpdateCandidate = async (req: Request, res: Response) => {
  try {
    req.body.userName = req.params.candidatePK;
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.update(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const DeleteCandidateByPK = async (req: Request, res: Response) => {
  try {
    const { candidatePK } = req.params;
    const crudCandidates = new CrudCandidatesApp();
    await crudCandidates.delete(candidatePK);
    return res.status(200).json({ message: 'Registro eliminado correctamente' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetCandidates = async (req: Request, res: Response) => {
  try {
    const params = req.query || {};
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.getCandidates(params);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetCandidateByPK = async (req: Request, res: Response) => {
  try {
    const { candidatePK } = req.params;
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.getCandidateByPK(candidatePK);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export {
  CreateCandidate,
  UpdateCandidate,
  DeleteCandidateByPK,
  GetCandidates,
  GetCandidateByPK,
};
