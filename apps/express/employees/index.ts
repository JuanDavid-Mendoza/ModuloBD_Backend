import { Router } from 'express';

/* Employees */
import {
  CreateEmployee,
  GetEmployees,
  LogIn,
  GetGeneralAnalysts,
} from './employees'

// Rutas para los servicios de los Empleados
const employeeRouter = Router();
const employeesPath = '/employees';

/* Employees */
employeeRouter.post(`${employeesPath}/create`, CreateEmployee);
employeeRouter.get(`${employeesPath}/getAll`, GetEmployees);
employeeRouter.post(`${employeesPath}/logIn`, LogIn);
employeeRouter.get(`${employeesPath}/getGeneralAnalysts`, GetGeneralAnalysts);

export { employeeRouter };