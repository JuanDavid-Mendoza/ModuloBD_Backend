import {
  executeQuery,
} from '../../shared/db.oracle';
import { EmployeeModel } from '../domain/employee.model';

export class PersistEmployeeMysql {
  async create(data: EmployeeModel): Promise<number> {
    data.FECHAEGRESO = data.FECHAEGRESO ? ` TO_DATE('${data.FECHAEGRESO}', 'DD-MM-YYYY') ` : null;

    const result = await executeQuery(
      `INSERT INTO EMPLEADO (CODEMPLEADO, NOMEMPLEADO, APELLEMPLEADO, FECHANACEMP, FECHAINGRE, FECHAEGRESO, CORREO)
        VALUES ('${data.CODEMPLEADO}', '${data.NOMEMPLEADO}', '${data.APELLEMPLEADO}', TO_DATE('${data.FECHANACEMP}', 'DD-MM-YYYY'),
          TO_DATE('${data.FECHAINGRE}', 'DD-MM-YYYY'), ${data.FECHAEGRESO}, '${data.CORREO}')`
    );

    return result;
  }
}
