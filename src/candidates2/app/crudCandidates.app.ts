import { CandidateModel } from '../domain/candidate.model';
import { GetCandidatesDto } from '../domain/getCandidates.dto';
import { PersistCandidateMysql } from '../infra/persistCandidate.mysql';
import { GetCandidatesMysql } from '../infra/getCandidates.mysql';

export class CrudCandidatesApp {
  async create(data: CandidateModel) {
    const getCandidates = new GetCandidatesMysql();
    const previous = await getCandidates.byPK(data.userName!);
    if (previous) return { message: 'El candidato ya existe en el sistema' }

    const persistCandidate = new PersistCandidateMysql();
    const result = await persistCandidate.create(data);

    return result ? { createdPK: data.userName } : null;
  }

  async update(data: CandidateModel) {
    const persistCandidate = new PersistCandidateMysql();
    if (data.userName) {
      const result = await persistCandidate.update(data);
      return result ? { updatedPK: data.userName } : null;
    }
    return { message: 'Llave primaria no encontrada' };
  }

  delete(candidatePK: string) {
    const persistCandidate = new PersistCandidateMysql();
    return persistCandidate.deleteByPK(candidatePK);
  }

  getCandidates(params: GetCandidatesDto) {
    const getCandidates = new GetCandidatesMysql();
    return getCandidates.getCandidates(params);
  }

  getCandidateByPK(candidatePK: string) {
    const getCandidates = new GetCandidatesMysql();
    return getCandidates.byPK(candidatePK);
  }
}
