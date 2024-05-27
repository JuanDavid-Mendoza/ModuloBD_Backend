import { CandidateModel } from '../domain/candidate.model';
import { CandidateProcessModel } from '../domain/candidateProcess.model';
import { PersistCandidateSql } from '../infra/persistCandidate.sql';
import { GetCandidatesSql } from '../infra/getCandidates.sql';
import { GetTestsSql } from '../../tests/infra/getTests.sql';

// Se realiza la lógica pertinente para hacer las peticiones a las clases "Sql" y ajustar las respuestas de las mismas
// Las clases "Model" representan las tablas de la base de datos

export class CandidatesApp {
  async create(data: CandidateModel) {
    const getCandidates = new GetCandidatesSql();
    const previous = await getCandidates.byPK(data.USUARIO!);
    if (previous) return { message: 'El candidato ya existe en el sistema' }

    const persistCandidate = new PersistCandidateSql();
    await persistCandidate.create(data);

    return { createdPK: data.USUARIO };
  }

  async createCandProcesses(data: CandidateProcessModel) {
    const persistCandidate = new PersistCandidateSql();
    const getCandidate = new GetCandidatesSql();
    const getTest = new GetTestsSql();
    const reqProcess = await getCandidate.getRequiremetProcessByPk(data.IDPERFIL_FK!, data.IDFASE_FK!, data.CONSECREQUE_FK!);
    if (!reqProcess) return false;

    if (!data.USERS) {
      data.USERS = (await getTest.getPreselectedCandidates(data.IDPERFIL_FK!, data.CONSECREQUE_FK!)).map((c) => c.USUARIO as any);
    }

    for await (const user of data.USERS!) {
      // Por cada usuario, crea un registro en la tabla ProcesoCandidato
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
    const getCandidates = new GetCandidatesSql();
    const candidates = await getCandidates.getCandidatesByProfile(profileId);

    if (candidates.length) {
      // Agrega las HVs de cada candidato
      const users = candidates.map((c) => `'${c.USUARIO}'`).join(',');
      const hvs = await getCandidates.getHVByUsers(users);

      if (hvs.length) candidates.forEach((candidate) => {
        candidate.HVS = hvs.filter((hv) => hv.USUARIO_FK === candidate.USUARIO);
      });
    }

    return candidates;
  }

  async getSummonedCandidates(profileId: string, reqConsec: string) {
    const getCandidates = new GetCandidatesSql();
    const candidates = await getCandidates.getSummonedCandidates(profileId, reqConsec);

    if (candidates.length) {
      // Agrega las HVs de cada candidato
      const users = candidates.map((c) => `'${c.USUARIO}'`).join(',');
      const hvs = await getCandidates.getHVByUsers(users);

      if (hvs.length) candidates.forEach((candidate) => {
        candidate.HVS = hvs.filter((hv) => hv.USUARIO_FK === candidate.USUARIO);
      });
    }

    return candidates;
  }
}
