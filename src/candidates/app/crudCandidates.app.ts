import { CandidateModel } from '../domain/candidate.model';
import { CandidateProcessModel } from '../domain/candidateProcess.model';
import { PersistCandidateMysql } from '../infra/persistCandidate.mysql';
import { GetCandidatesMysql } from '../infra/getCandidates.mysql';

export class CrudCandidatesApp {
  async create(data: CandidateModel) {
    const getCandidates = new GetCandidatesMysql();
    const previous = await getCandidates.byPK(data.USUARIO!);
    if (previous) return { message: 'El candidato ya existe en el sistema' }

    const persistCandidate = new PersistCandidateMysql();
    await persistCandidate.create(data);

    return { createdPK: data.USUARIO };
  }

  async createCandProcesses(data: CandidateProcessModel) {
    const persistCandidate = new PersistCandidateMysql();
    const getCandidate = new GetCandidatesMysql();
    const reqProcess = await getCandidate.getRequiremetProcessByPk(data.IDPERFIL_FK!, data.IDFASE_FK!, data.CONSECREQUE_FK!);
    if (!reqProcess) return false;

    for await (const user of data.USERS!) {
      const process = {
        USUARIO_FK: user,
        IDPERFIL_FK: data.IDPERFIL_FK,
        IDFASE_FK: data.IDFASE_FK,
        CONSECREQUE_FK: data.CONSECREQUE_FK,
        CONSPROCESO_FK: reqProcess.CONSPROCESO,
        FECHAPRESENTACION: data.FECHAPRESENTACION
      }

      await persistCandidate.createCandProcess(process);
    }

    return true;
  }

  async getCandidatesByProfile(profileId: string) {
    const getCandidates = new GetCandidatesMysql();
    const candidates = await getCandidates.getCandidates(profileId);

    if (candidates.length) {
      const users = candidates.map((c) => `'${c.USUARIO}'`).join(',');
      const hvs = await getCandidates.getHVByUsers(users);

      if (hvs.length) candidates.forEach((candidate) => {
        candidate.HVS = hvs.filter((hv) => hv.USUARIO_FK === candidate.USUARIO);
      });
    }

    return candidates;
  }

  async getSummonedCandidates(profileId: string, reqConsec: string) {
    const getCandidates = new GetCandidatesMysql();
    const candidates = await getCandidates.getSummonedCandidates(profileId, reqConsec);

    if (candidates.length) {
      const users = candidates.map((c) => `'${c.USUARIO}'`).join(',');
      const hvs = await getCandidates.getHVByUsers(users);

      if (hvs.length) candidates.forEach((candidate) => {
        candidate.HVS = hvs.filter((hv) => hv.USUARIO_FK === candidate.USUARIO);
      });
    }

    return candidates;
  }
}
