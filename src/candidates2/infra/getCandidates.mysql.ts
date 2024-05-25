import {
  first,
  executeQuery,
} from '../../shared/db.oracle';
import { GetCandidatesDto } from '../domain/getCandidates.dto';

export class GetCandidatesMysql {
  async byPK(candidatePK: string): Promise<any> {
    const candidate = await first(
      `select c.* from Candidate c
        where c.userName = '${candidatePK}'`
    );

    return candidate;
  }

  async getCandidates(params: GetCandidatesDto): Promise<any[]> {
    const auxWhere = params.name
      ? ` and (lower(c.name) like lower('%${params.name}%') 
          or lower(c.lastName) like lower('%${params.name}%') 
          or lower(c.userName) like lower('%${params.name}%')) 
        `
      : '';

    const candidates = await executeQuery(
      `select c.* from Candidate c
        where c.userName is not null ${auxWhere}`
    );

    return candidates;
  }
}
