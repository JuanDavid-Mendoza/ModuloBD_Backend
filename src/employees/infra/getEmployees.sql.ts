import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { EmployeeModel } from '../domain/employee.model';

export class GetEmployeesSql {
  async byPK(employeePK: string): Promise<EmployeeModel> {
    const employee = await first(
      `SELECT E.* FROM EMPLEADO E
        WHERE E.CODEMPLEADO = '${employeePK}'`
    );

    return employee;
  }

  async getEmployees(): Promise<EmployeeModel[]> {
    const employees = await executeQuery(
      `SELECT E.* FROM EMPLEADO E`
    );

    return employees;
  }

  async byEmail(email: string): Promise<EmployeeModel> {
    const employee = await first(
      `SELECT E.*, TC.DESCTIPOCARGO FROM EMPLEADO E
        INNER JOIN CARGO C ON C.CODEMPLEADO_FK = E.CODEMPLEADO
        INNER JOIN TIPOCARGO TC ON TC.IDTIPOCARGO = C.IDTIPOCARGO_FK
        WHERE E.CORREO = '${email}'`
    );

    return employee;
  }

  async getGeneralAnalysts(): Promise<EmployeeModel[]> {
    const generalAnalysts = await executeQuery(
      `SELECT DISTINCT E.* FROM CARGO C
        INNER JOIN EMPLEADO E ON E.CODEMPLEADO = C.CODEMPLEADO_FK
        INNER JOIN TIPOCARGO TC ON TC.IDTIPOCARGO = C.IDTIPOCARGO_FK
        WHERE UPPER(TRIM(TC.DESCTIPOCARGO)) = 'ANALISTA GENERAL'`
    );

    return generalAnalysts;
  }
}
