import {
  executeQuery,
} from '../../shared/db.oracle';
import { CandidateModel } from '../domain/candidate.model';

export class PersistCandidateMysql {
  async create(data: CandidateModel): Promise<number> {
    const result = await executeQuery(
      `INSERT INTO CANDIDATO (USUARIO, IDTIPODOC_FK, NOMBRE, APELLIDO, FECHANACCAND, NDOC) VALUES ('${data.USUARIO}', 
        '${data.IDTIPODOC_FK}', '${data.NOMBRE}', '${data.APELLIDO}', TO_DATE('${data.FECHANACCAND}', 'DD-MM-YYYY'), ${data.NDOC})`
    );

    return result;
  }
}
