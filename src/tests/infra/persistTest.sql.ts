import {
  executeQuery,
} from '../../shared/db.oracle';
import { CandidateTestModel } from '../domain/candidateTest.model';
import { TestModel } from '../domain/test.model';

export class PersistTestSql {
  async create(data: TestModel): Promise<number> {
    data.IDDISCIPLINA_FK = data.IDDISCIPLINA_FK ? ` '${data.IDDISCIPLINA_FK}' ` : null;
    data.FECHACREADA = data.FECHACREADA ? ` TO_DATE('${data.FECHACREADA}', 'DD-MM-YYYY') ` : null;

    const result = await executeQuery(
      `INSERT INTO PRUEBA (IDPRUEBA, IDFASE_FK, IDTIPOPRUEBA_FK, IDDISCIPLINA_FK, DESCPRUEBA, PRUEBAACTIVA, FECHACREADA) 
        VALUES ('${data.IDPRUEBA}', '${data.IDFASE_FK}', '${data.IDTIPOPRUEBA_FK}', ${data.IDDISCIPLINA_FK},
          '${data.DESCPRUEBA}', ${data.PRUEBAACTIVA}, ${data.FECHACREADA})`
    );

    return result;
  }

  async createCandTest(data: CandidateTestModel): Promise<boolean> {
    const result = await executeQuery(
      `INSERT INTO PRUEBACANDIDATO (CONSEPRUEBACANDI, USUARIO_FK, IDPERFIL_FK, IDFASE_FK, CONSECREQUE_FK, CONSPROCESO_FK, 
        IDPRUEBA_FK, FECHAPRES) VALUES (${data.CONSEPRUEBACANDI}, '${data.USUARIO_FK}', '${data.IDPERFIL_FK}', 
        '${data.IDFASE_FK}', ${data.CONSECREQUE_FK}, ${data.CONSPROCESO_FK}, '${data.IDPRUEBA_FK}', 
        TO_DATE('${data.FECHAPRES}', 'DD-MM-YYYY'))`
    );

    return result;
  }
}
