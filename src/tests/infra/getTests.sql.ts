import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { TestModel } from '../domain/test.model';
import { CandidateModel } from '../../candidates/domain/candidate.model';

export class GetTestsSql {
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
          AND PC.IDFASE_FK = '5' AND PC.CONSECREQUE_FK = ${reqConsec})`
    );

    return tests;
  }

  async getLastConsec(): Promise<number> {
    // Obtiene el último consecutivo de los registros en PruebaCandidato actuales en la base de datos
    const consec = await executeQuery(
      `SELECT PC.CONSEPRUEBACANDI FROM PRUEBACANDIDATO PC ORDER BY PC.CONSEPRUEBACANDI DESC`
    ).then((r) => r.length ? r[0].CONSECREQUE : 1);

    return consec;
  }

  async getWinners(profileId: string, phaseId: string, reqConsec: number, testId: string): Promise<CandidateModel[]> {
    // Primero obtiene la cantidad de preguntas de la Prueba
    // Luego obtiene el correo (C.USUARIO) de los candidatos que participaron en la prueba con su puntuación
    // Luego obtiene toda la información de los candidatos cuyo puntaje fue superior a 0.4
    const winners = await executeQuery(
      `SELECT C.*, TD.DESCTIPODOC FROM CANDIDATO C
      INNER JOIN TIPODOC TD ON TD.IDTIPODOC = C.IDTIPODOC_FK
      INNER JOIN (
        SELECT C.USUARIO, COUNT(PREC.CONSEPRUEBACANDI_FK)/PRU.TOTAL SCORE FROM PREGUNTA P
        INNER JOIN PREGUNTACANDIDATO PREC ON (PREC.CONSEPREGUNTA_FK = P.CONSEPREGUNTA AND PREC.IDPRUEBA_FK = P.IDPRUEBA_FK)
        INNER JOIN RESPUESTACANDIDATO RC ON (RC.CONSEPREGUNTA_FK = PREC.CONSEPREGUNTA_FK AND RC.IDPRUEBA_FK = PREC.IDPRUEBA_FK 
          AND RC.CONSEPRUEBACANDI_FK = PREC.CONSEPRUEBACANDI_FK)
        INNER JOIN RESPUESTA R ON (R.CONSEPREGUNTA_FK = P.CONSEPREGUNTA AND R.IDPRUEBA_FK = P.IDPRUEBA_FK 
          AND R.RESPUESTA = RC.RESCANDI)
        INNER JOIN PRUEBACANDIDATO PRUC ON PRUC.CONSEPRUEBACANDI = PREC.CONSEPRUEBACANDI_FK
        INNER JOIN PROCESOCANDIDATO PROC ON (PROC.CONSPROCESO_FK = PRUC.CONSPROCESO_FK AND PROC.IDPERFIL_FK = PRUC.IDPERFIL_FK
          AND PROC.IDFASE_FK = PRUC.IDFASE_FK AND PROC.USUARIO_FK = PRUC.USUARIO_FK)
        INNER JOIN CANDIDATO C ON C.USUARIO = PROC.USUARIO_FK
        INNER JOIN (
          SELECT P.IDPRUEBA, COUNT(PR.CONSEPREGUNTA) TOTAL FROM PRUEBA P
          INNER JOIN PREGUNTA PR ON PR.IDPRUEBA_FK = P.IDPRUEBA
          GROUP BY P.IDPRUEBA
        ) PRU ON PRU.IDPRUEBA = P.IDPRUEBA_FK
        WHERE PRUC.IDPERFIL_FK = '${profileId}' AND PRUC.IDFASE_FK = '${phaseId}' 
        AND PRUC.CONSECREQUE_FK = ${reqConsec} AND PRUC.IDPRUEBA_FK = '${testId}'
        GROUP BY C.USUARIO, PRU.TOTAL
      ) WINNERS ON WINNERS.USUARIO = C.USUARIO AND WINNERS.SCORE > 0.4`
    );

    return winners;
  }
}
