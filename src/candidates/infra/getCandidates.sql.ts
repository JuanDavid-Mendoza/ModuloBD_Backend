import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { CandidateModel } from '../domain/candidate.model';
import { HVModel } from '../domain/hv.model';
import { RequirementProcessModel } from '../../requirements/domain/requirementProcess.model';

export class GetCandidatesSql {
  async byPK(candidatePK: string): Promise<CandidateModel> {
    const candidate = await first(
      `SELECT C.* FROM CANDIDATO C
        WHERE C.USUARIO = '${candidatePK}'`
    );

    return candidate;
  }

  async getCandidatesByProfile(profileId: string, reqConsec: string): Promise<CandidateModel[]> {
    const candidates = await executeQuery(
      `SELECT DISTINCT C.*, TD.DESCTIPODOC FROM CANDIDATO C
        INNER JOIN TIPODOC TD ON TD.IDTIPODOC = C.IDTIPODOC_FK
        INNER JOIN HV ON HV.USUARIO_FK = C.USUARIO
        INNER JOIN TIPOITEMPERFIL TIP ON TIP.IDTIPOITEMPERFIL = HV.IDTIPOITEMPERFIL_FK
        WHERE C.USUARIO IN (
          SELECT USUARIO_FK FROM PROCESOCANDIDATO
          WHERE IDPERFIL_FK = '${profileId}' AND IDFASE_FK = '3' AND CONSECREQUE_FK = ${reqConsec}
        )`
    );

    return candidates;
  }

  async getSummonedCandidates(profileId: string, reqConsec: string): Promise<CandidateModel[]> {
    // Candidatos que aceptaros la invitación y la convocatoria
    const candidates = await executeQuery(
      `SELECT DISTINCT C.*, TD.DESCTIPODOC FROM CANDIDATO C
      INNER JOIN TIPODOC TD ON TD.IDTIPODOC = C.IDTIPODOC_FK
      WHERE C.USUARIO IN (
        SELECT USUARIO_FK FROM PROCESOCANDIDATO
        WHERE IDPERFIL_FK = '${profileId}' AND IDFASE_FK = '3' AND CONSECREQUE_FK = ${reqConsec} 
        INTERSECT
        SELECT USUARIO_FK FROM PROCESOCANDIDATO
        WHERE IDPERFIL_FK = '${profileId}' AND IDFASE_FK = '4' AND CONSECREQUE_FK = ${reqConsec}
      )`
    );

    return candidates;
  }

  async getHVByUsers(users: string): Promise<HVModel[]> {
    const hvs = await executeQuery(
      `SELECT HV.*, I.NOMINSTITUCION, TIP.DESCTIPOITEMPERFIL FROM HV 
        INNER JOIN INSTITUCION I ON I.CODINSTITUCION = HV.CODINSTITUCION_FK
        INNER JOIN TIPOITEMPERFIL TIP ON TIP.IDTIPOITEMPERFIL = HV.IDTIPOITEMPERFIL_FK
        WHERE HV.USUARIO_FK IN (${users}) ORDER BY HV.IDTIPOITEMPERFIL_FK`
    );

    return hvs;
  }

  async getRequiremetProcessByPk(profileId: string, phaseId: string, reqConsec: number): Promise<RequirementProcessModel> {
    const req = await executeQuery(
      `SELECT CONSPROCESO FROM PROCESOREQUERIMIENTO 
      WHERE IDPERFIL_FK = '${profileId}' and IDFASE_FK = '${phaseId}' and CONSECREQUE_FK = ${reqConsec}`
    );

    return req[0];
  }
}
