import {
  deleteRecord,
  insertRecord,
  updateRecord,
} from '../../shared/db.oracle';
import { CandidateModel } from '../domain/candidate.model';

export class PersistCandidateMysql {
  async create(data: CandidateModel): Promise<number> {
    const result = await insertRecord('Candidate', data);
    return result;
  }

  async update(data: CandidateModel): Promise<number> {
    let result;
    if (data.userName) {
      result = await updateRecord('Candidate', 'userName', data.userName, data);
    }

    return result;
  }

  async deleteByPK(candidatePK: string): Promise<void> {
    await deleteRecord('Candidate', 'userName', candidatePK);
  }
}
