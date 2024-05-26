import { Router } from 'express';

/* Requirements */
import {
  CreateRequirement,
  GetRequirements,
  GetByEmployeeCode,
  CreateRequirementProcesses,
  UpdateRequirementProcess,
} from './requirements'

// Rutas para los servicios de los Requerimientos
const requirementRouter = Router();
const requirementsPath = '/requirements';

/* Requirements */
requirementRouter.post(`${requirementsPath}/create`, CreateRequirement);
requirementRouter.get(`${requirementsPath}/getAll`, GetRequirements);
requirementRouter.get(`${requirementsPath}/getByEmployeeCode/:employeeCode`, GetByEmployeeCode);
requirementRouter.post(`${requirementsPath}/createReqProcesses`, CreateRequirementProcesses);
requirementRouter.put(`${requirementsPath}/updateReqProcess`, UpdateRequirementProcess);

export { requirementRouter };