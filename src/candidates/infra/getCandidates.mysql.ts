import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { CandidateModel } from '../domain/candidate.model';
import { HVModel } from '../domain/hv.model';

export class GetCandidatesMysql {
  async byPK(candidatePK: string): Promise<CandidateModel> {
    const candidate = await first(
      `SELECT C.* FROM CANDIDATO C
        WHERE C.USUARIO = '${candidatePK}'`
    );

    return candidate;
  }

  async getCandidates(profileId: string): Promise<CandidateModel[]> {
    const candidates = await executeQuery(
      `SELECT DISTINCT C.*, TD.DESCTIPODOC FROM CANDIDATO C
        INNER JOIN TIPODOC TD ON TD.IDTIPODOC = C.IDTIPODOC_FK
        INNER JOIN HV ON HV.USUARIO_FK = C.USUARIO
        INNER JOIN TIPOITEMPERFIL TIP ON TIP.IDTIPOITEMPERFIL = HV.IDTIPOITEMPERFIL_FK
        WHERE TIP.IDTIPOITEMPERFIL IN (
          SELECT TIP.IDTIPOITEMPERFIL FROM TIPOITEMPERFIL TIP
          INNER JOIN ITEMPERFIL IP ON IP.IDTIPOITEMPERFIL_FK = TIP.IDTIPOITEMPERFIL
          WHERE IP.IDPERFIL_FK = '${profileId}'
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
}
