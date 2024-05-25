import { Request, Response } from 'express';
import { CrudProfilesApp } from '../../../src/profiles/app/crudProfiles.app';

const CreateProfile = async (req: Request, res: Response) => {
  try {
    const crudProfiles = new CrudProfilesApp();
    const data = await crudProfiles.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetProfiles = async (req: Request, res: Response) => {
  try {
    const crudProfiles = new CrudProfilesApp();
    const data = await crudProfiles.getProfiles();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export {
  CreateProfile,
  GetProfiles,
};
