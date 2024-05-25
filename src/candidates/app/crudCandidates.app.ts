import { CandidateModel } from '../domain/candidate.model';
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

  async getCandidates(profileId: string) {
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
}
