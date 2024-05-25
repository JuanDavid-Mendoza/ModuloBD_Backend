import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { TestModel } from '../domain/test.model';

export class GetTestsMysql {
  async byPK(testPK: string): Promise<TestModel> {
    const test = await first(
      `SELECT P.* FROM PRUEBA P
        WHERE P.IDPRUEBA = '${testPK}'`
    );

    return test;
  }

  async getTests(): Promise<TestModel[]> {
    const tests = await executeQuery(
      `SELECT P.* FROM PRUEBA P`
    );

    return tests;
  }

  async getTestByProfile(profilePK: string): Promise<TestModel[]> {
    const tests = await executeQuery(
      `SELECT P.* FROM PRUEBA P
        INNER JOIN PROFILE PR ON PR.IDDISCIPLINA_FK = P.IDDISCIPLINA_FK
        WHERE PR.IDPERFIL = ${profilePK}`
    );

    return tests;
  }
}
