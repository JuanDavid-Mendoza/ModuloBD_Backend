import { Router } from 'express';

/* Requirements */
import {
  CreateRequirement,
  GetRequirements,
  GetByEmployeeCode,
  CreateRequirementProcesses,
  UpdateRequirementProcess,
  SendEmail,
} from './requirements'

const requirementRouter = Router();
const requirementsPath = '/requirements';

/* Requirements */
requirementRouter.post(`${requirementsPath}/create`, CreateRequirement);
requirementRouter.get(`${requirementsPath}/getAll`, GetRequirements);
requirementRouter.get(`${requirementsPath}/getByEmployeeCode/:employeeCode`, GetByEmployeeCode);
requirementRouter.post(`${requirementsPath}/createReqProcesses`, CreateRequirementProcesses);
requirementRouter.put(`${requirementsPath}/updateReqProcess`, UpdateRequirementProcess);
requirementRouter.post(`${requirementsPath}/sendEmail`, SendEmail);

export { requirementRouter };