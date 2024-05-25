import { Request, Response } from 'express';
import { CrudRequirementsApp } from '../../../src/requirements/app/crudRequirements.app';

const CreateRequirement = async (req: Request, res: Response) => {
  try {
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const GetRequirements = async (req: Request, res: Response) => {
  try {
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.getRequirements();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const GetByEmployeeCode = async (req: Request, res: Response) => {
  try {
    const { employeeCode } = req.params;
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.getByEmployeeCode(employeeCode);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const CreateRequirementProcesses = async (req: Request, res: Response) => {
  try {
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.createReqProcesses(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const UpdateRequirementProcess = async (req: Request, res: Response) => {
  try {
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.updateReqProcess(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};
const SendEmail = async (req: Request, res: Response) => {
  try {
    const crudRequirements = new CrudRequirementsApp();
    const data = await crudRequirements.sendEmail(req.body);
    res.status(200).json(data);
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
};

export {
  CreateRequirement,
  GetRequirements,
  GetByEmployeeCode,
  CreateRequirementProcesses,
  UpdateRequirementProcess,
  SendEmail,
};
