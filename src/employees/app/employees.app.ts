import { EmployeeModel } from '../domain/employee.model';
import { PersistEmployeeSql } from '../infra/persistEmployee.sql';
import { GetEmployeesSql } from '../infra/getEmployees.sql';

// Se realiza la lógica pertinente para hacer las peticiones a las clases "Sql" y ajustar las respuestas de las mismas
// Las clases "Model" representan las tablas de la base de datos

export class EmployeesApp {
  async create(data: EmployeeModel) {
    const getEmployees = new GetEmployeesSql();
    const previous = await getEmployees.byPK(data.CODEMPLEADO!);
    if (previous) return { message: 'El empleado ya existe en el sistema' }

    const persistEmployee = new PersistEmployeeSql();
    await persistEmployee.create(data);

    return { createdPK: data.CODEMPLEADO };
  }

  getEmployees() {
    const getEmployees = new GetEmployeesSql();
    return getEmployees.getEmployees();
  }

  async logIn(data: EmployeeModel) {
    const getEmployees = new GetEmployeesSql();
    const prev = await getEmployees.byEmail(data.CORREO!);
    if (!prev) return { message: 'El correo no se encuentra en el sistema.', employee: null }
    const message = data.CODEMPLEADO === prev.CODEMPLEADO ? 'Inicio de sesión exitoso.' : 'Código incorrecto';
    const employee = data.CODEMPLEADO === prev.CODEMPLEADO ? prev : null;

    return { message, employee };
  }

  getGeneralAnalysts() {
    const getEmployees = new GetEmployeesSql();
    return getEmployees.getGeneralAnalysts();
  }
}
