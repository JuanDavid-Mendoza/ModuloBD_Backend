import { Request, Response } from 'express';
import { CrudCandidatesApp } from '../../../src/candidates/app/crudCandidates.app';

const CreateCandidate = async (req: Request, res: Response) => {
  try {
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetCandidates = async (req: Request, res: Response) => {
  try {
    const profileId = req.query ? req.query.profileId : null as any;
    const crudCandidates = new CrudCandidatesApp();
    const data = await crudCandidates.getCandidates(profileId);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};

export {
  CreateCandidate,
  GetCandidates,
};
