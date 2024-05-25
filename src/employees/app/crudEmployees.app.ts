import { EmployeeModel } from '../domain/employee.model';
import { PersistEmployeeMysql } from '../infra/persistEmployee.mysql';
import { GetEmployeesMysql } from '../infra/getEmployees.mysql';

export class CrudEmployeesApp {
  async create(data: EmployeeModel) {
    const getEmployees = new GetEmployeesMysql();
    const previous = await getEmployees.byPK(data.CODEMPLEADO!);
    if (previous) return { message: 'El empleado ya existe en el sistema' }

    const persistEmployee = new PersistEmployeeMysql();
    await persistEmployee.create(data);

    return { createdPK: data.CODEMPLEADO };
  }

  getEmployees() {
    const getEmployees = new GetEmployeesMysql();
    return getEmployees.getEmployees();
  }

  async logIn(data: EmployeeModel) {
    const getEmployees = new GetEmployeesMysql();
    const prev = await getEmployees.byEmail(data.CORREO!);
    if (!prev) return { message: 'El correo no se encuentra en el sistema.', employee: null }
    const message = data.CODEMPLEADO === prev.CODEMPLEADO ? 'Inicio de sesión exitoso.' : 'Código incorrecto';
    const employee = data.CODEMPLEADO === prev.CODEMPLEADO ? prev : null;

    return { message, employee };
  }

  getGeneralAnalysts() {
    const getEmployees = new GetEmployeesMysql();
    return getEmployees.getGeneralAnalysts();
  }
}
