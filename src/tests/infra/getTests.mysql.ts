import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { TestModel } from '../domain/test.model';
import { CandidateModel } from '../../candidates/domain/candidate.model';

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
        INNER JOIN PERFIL PR ON PR.IDDISCIPLINA_FK = P.IDDISCIPLINA_FK
        WHERE PR.IDPERFIL = ${profilePK} AND P.PRUEBAACTIVA = 1`
    );

    return tests;
  }

  async getPreselectedCandidates(profileId: string, reqConsec: number): Promise<CandidateModel[]> {
    const tests = await executeQuery(
      `SELECT C.* FROM CANDIDATO C
        INNER JOIN PROCESOCANDIDATO PC ON (PC.USUARIO_FK = C.USUARIO AND PC.IDPERFIL_FK = '${profileId}' 
          AND PC.IDFASE_FK = '6' AND PC.CONSECREQUE_FK = ${reqConsec})`
    );

    return tests;
  }

  async getLastConsec(): Promise<number> {
    const consec = await executeQuery(
      `SELECT PC.CONSEPRUEBACANDI FROM PRUEBACANDIDATO PC ORDER BY PC.CONSEPRUEBACANDI DESC`
    ).then((r) => r.length ? r[0].CONSECREQUE : 1);

    return consec;
  }
}
