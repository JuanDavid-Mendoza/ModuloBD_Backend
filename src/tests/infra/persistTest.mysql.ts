import {
  executeQuery,
} from '../../shared/db.oracle';
import { TestModel } from '../domain/test.model';

export class PersistTestMysql {
  async create(data: TestModel): Promise<number> {
    data.IDDISCIPLINA_FK = data.IDDISCIPLINA_FK ? ` '${data.IDDISCIPLINA_FK}' ` : null;
    data.FECHACREADA = data.FECHACREADA ? ` TO_DATE('${data.FECHACREADA}', 'DD-MM-YYYY') ` : null;

    const result = await executeQuery(
      `INSERT INTO PERFIL (IDPRUEBA, IDFASE_FK, IDTIPOPRUEBA_FK, IDDISCIPLINA_FK, DESCPRUEBA, PRUEBAACTIVA, FECHACREADA) 
        VALUES ('${data.IDPRUEBA}', '${data.IDFASE_FK}', '${data.IDTIPOPRUEBA_FK}', ${data.IDDISCIPLINA_FK},
          '${data.DESCPRUEBA}', ${data.PRUEBAACTIVA}, ${data.FECHACREADA})`
    );

    return result;
  }
}
