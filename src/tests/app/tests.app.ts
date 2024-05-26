import { TestModel } from '../domain/test.model';
import { CandidateTestModel } from '../domain/candidateTest.model';
import { PersistTestSql } from '../infra/persistTest.sql';
import { GetTestsSql } from '../infra/getTests.sql';
import { GetCandidatesSql } from '../../candidates/infra/getCandidates.sql';

// Se realiza la lógica pertinente para hacer las peticiones a las clases "Sql" y ajustar las respuestas de las mismas
// Las clases "Model" representan las tablas de la base de datos

export class TestsApp {
  async create(data: TestModel) {
    const getTests = new GetTestsSql();
    const previous = await getTests.byPK(data.IDPRUEBA!);
    if (previous) return { message: 'La prueba ya existe en el sistema' }

    const persistTest = new PersistTestSql();
    await persistTest.create(data);

    return { createdPK: data.IDPRUEBA };
  }

  getTests() {
    const getTests = new GetTestsSql();
    return getTests.getTests();
  }
  
  getTestByProfile(profilePK: string) {
    const getTests = new GetTestsSql();
    return getTests.getTestByProfile(profilePK);
  }

  async createCandTest(data: CandidateTestModel) {
    const getTests = new GetTestsSql();
    const persistTest = new PersistTestSql();
    const getCandidates = new GetCandidatesSql();
    const candidates = await getTests.getPreselectedCandidates(data.IDPERFIL_FK!, data.CONSECREQUE_FK!);

    let consec = await getTests.getLastConsec();
    const reqProcess = await getCandidates.getRequiremetProcessByPk(data.IDPERFIL_FK!, data.IDFASE_FK!, data.CONSECREQUE_FK!);

    // Por cada candidato preseleccionado, crea un registro en la tabla PruebaCandidato
    if (candidates.length) {
      for await (const candidate of candidates) {
        const test = {
          CONSEPRUEBACANDI: consec,
          USUARIO_FK: candidate.USUARIO,
          IDPERFIL_FK: data.IDPERFIL_FK,
          IDFASE_FK: data.IDFASE_FK,
          CONSECREQUE_FK: data.CONSECREQUE_FK,
          CONSPROCESO_FK: reqProcess.CONSPROCESO,
          IDPRUEBA_FK: data.IDPRUEBA_FK,
          FECHAPRES: data.FECHAPRES,
        }
  
        await persistTest.createCandTest(test);
        consec++;
      }
    }

    return true;
  }

  getWinners(profileId: string, phaseId: string, reqConsec: number, testId: string) {
    const getTests = new GetTestsSql();
    return getTests.getWinners(profileId, phaseId, reqConsec, testId);
  }
}
