import {
  executeQuery,
} from '../../shared/db.oracle';
import { CandidateModel } from '../domain/candidate.model';
import { CandidateProcessModel } from '../domain/candidateProcess.model';

export class PersistCandidateSql {
  async create(data: CandidateModel): Promise<number> {
    const result = await executeQuery(
      `INSERT INTO CANDIDATO (USUARIO, IDTIPODOC_FK, NOMBRE, APELLIDO, FECHANACCAND, NDOC) VALUES ('${data.USUARIO}', 
        '${data.IDTIPODOC_FK}', '${data.NOMBRE}', '${data.APELLIDO}', TO_DATE('${data.FECHANACCAND}', 'DD-MM-YYYY'), ${data.NDOC})`
    );

    return result;
  }

  async createCandProcess(data: CandidateProcessModel): Promise<number> {
    // Crea un registro de la tabla ProcesoCandidato
    data.ANALISIS = data.ANALISIS ? ` '${data.ANALISIS}' ` : null;
    data.OBSERVACION = data.OBSERVACION ? ` '${data.OBSERVACION}' ` : null;

    const result = await executeQuery(
      `INSERT INTO PROCESOCANDIDATO (USUARIO_FK, IDPERFIL_FK, IDFASE_FK, CONSECREQUE_FK, CONSPROCESO_FK, 
        FECHAPRESENTACION, ANALISIS, OBSERVACION) VALUES ('${data.USUARIO_FK}', '${data.IDPERFIL_FK}', '${data.IDFASE_FK}',
        ${data.CONSECREQUE_FK}, ${data.CONSPROCESO_FK}, TO_DATE('${data.FECHAPRESENTACION}', 'DD-MM-YYYY'),
        ${data.ANALISIS}, ${data.OBSERVACION})`
    );

    return result;
  }
}
