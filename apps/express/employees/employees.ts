import { Request, Response } from 'express';
import { EmployeesApp } from '../../../src/employees/app/employees.app';

// Se obtienen los parámetros de la petición y son enviados a las "App" en sus respectivos métodos

const CreateEmployee = async (req: Request, res: Response) => {
  try {
    const crudEmployees = new EmployeesApp();
    const data = await crudEmployees.create(req.body);
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetEmployees = async (req: Request, res: Response) => {
  try {
    const crudEmployees = new EmployeesApp();
    const data = await crudEmployees.getEmployees();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const LogIn = async (req: Request, res: Response) => {
  try {
    const crudEmployees = new EmployeesApp();
    const data = await crudEmployees.logIn(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const GetGeneralAnalysts = async (req: Request, res: Response) => {
  try {
    const crudEmployees = new EmployeesApp();
    const data = await crudEmployees.getGeneralAnalysts();
    return data ? res.status(200).json(data) : res.status(200).json();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export {
  CreateEmployee,
  GetEmployees,
  LogIn,
  GetGeneralAnalysts,
};
