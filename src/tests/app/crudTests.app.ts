import { TestModel } from '../domain/test.model';
import { CandidateTestModel } from '../domain/candidateTest.model';
import { PersistTestMysql } from '../infra/persistTest.mysql';
import { GetTestsMysql } from '../infra/getTests.mysql';
import { GetCandidatesMysql } from '../../candidates/infra/getCandidates.mysql';

export class CrudTestsApp {
  async create(data: TestModel) {
    const getTests = new GetTestsMysql();
    const previous = await getTests.byPK(data.IDPRUEBA!);
    if (previous) return { message: 'La prueba ya existe en el sistema' }

    const persistTest = new PersistTestMysql();
    await persistTest.create(data);

    return { createdPK: data.IDPRUEBA };
  }

  getTests() {
    const getTests = new GetTestsMysql();
    return getTests.getTests();
  }
  
  getTestByProfile(profilePK: string) {
    const getTests = new GetTestsMysql();
    return getTests.getTestByProfile(profilePK);
  }

  async createCandTest(data: CandidateTestModel) {
    const getTests = new GetTestsMysql();
    const persistTest = new PersistTestMysql();
    const getCandidates = new GetCandidatesMysql();
    const candidates = await getTests.getPreselectedCandidates(data.IDPERFIL_FK!, data.CONSECREQUE_FK!);

    let consec = await getTests.getLastConsec();
    const reqProcess = await getCandidates.getRequiremetProcessByPk(data.IDPERFIL_FK!, data.IDFASE_FK!, data.CONSECREQUE_FK!);

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
}
