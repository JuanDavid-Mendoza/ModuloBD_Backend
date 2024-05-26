import { Request, Response } from 'express';
import { CandidatesApp } from '../../../src/candidates/app/candidates.app';

// Se obtienen los parámetros de la petición y son enviados a las "App" en sus respectivos métodos

const CreateCandidate = async (req: Request, res: Response) => {
  try {
    const crudCandidates = new CandidatesApp();
    const data = await crudCandidates.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const CreateCandidateProcesses = async (req: Request, res: Response) => {
  try {
    const crudCandidates = new CandidatesApp();
    const data = await crudCandidates.createCandProcesses(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};
const GetCandidatesByProfile = async (req: Request, res: Response) => {
  try {
    const profileId = req.params ? req.params.profileId : null as any;
    const crudCandidates = new CandidatesApp();
    const data = await crudCandidates.getCandidatesByProfile(profileId);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const GetSummonedCandidates = async (req: Request, res: Response) => {
  try {
    const params = req.query as any || {};
    const crudCandidates = new CandidatesApp();
    const data = await crudCandidates.getSummonedCandidates(params.profileId, params.reqConsec);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};

export {
  CreateCandidate,
  CreateCandidateProcesses,
  GetCandidatesByProfile,
  GetSummonedCandidates,
};
