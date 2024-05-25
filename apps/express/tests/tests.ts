import { Request, Response } from 'express';
import { CrudTestsApp } from '../../../src/Tests/app/crudTests.app';

const CreateTest = async (req: Request, res: Response) => {
  try {
    const crudTests = new CrudTestsApp();
    const data = await crudTests.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetTests = async (req: Request, res: Response) => {
  try {
    const crudTests = new CrudTestsApp();
    const data = await crudTests.getTests();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetTestByProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const crudTests = new CrudTestsApp();
    const data = await crudTests.getTestByProfile(profileId);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export {
  CreateTest,
  GetTests,
  GetTestByProfile,
};
