import { Request, Response } from 'express';
import { TestsApp } from '../../../src/tests/app/tests.app';

// Se obtienen los parámetros de la petición y son enviados a las "App" en sus respectivos métodos

const CreateTest = async (req: Request, res: Response) => {
  try {
    const crudTests = new TestsApp();
    const data = await crudTests.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetTests = async (req: Request, res: Response) => {
  try {
    const crudTests = new TestsApp();
    const data = await crudTests.getTests();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetTestByProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const crudTests = new TestsApp();
    const data = await crudTests.getTestByProfile(profileId);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};
const CreateCandidateTest = async (req: Request, res: Response) => {
  try {
    const crudTests = new TestsApp();
    const data = await crudTests.createCandTest(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const GetWinningCandidates = async (req: Request, res: Response) => {
  try {
    const params = req.query as any || {};
    const crudTests = new TestsApp();
    const data = await crudTests.getWinners(params.profileId, params.phaseId, params.reqConsec, params.testId);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};

export {
  CreateTest,
  GetTests,
  GetTestByProfile,
  CreateCandidateTest,
  GetWinningCandidates,
};
