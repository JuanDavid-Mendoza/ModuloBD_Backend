import { Request, Response } from 'express';
import { ProfilesApp } from '../../../src/profiles/app/profiles.app';

// Se obtienen los parámetros de la petición y son enviados a las "App" en sus respectivos métodos

const CreateProfile = async (req: Request, res: Response) => {
  try {
    const crudProfiles = new ProfilesApp();
    const data = await crudProfiles.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetProfiles = async (req: Request, res: Response) => {
  try {
    const crudProfiles = new ProfilesApp();
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
