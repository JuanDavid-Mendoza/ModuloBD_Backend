import { TestModel } from '../domain/test.model';
import { PersistTestMysql } from '../infra/persistTest.mysql';
import { GetTestsMysql } from '../infra/getTests.mysql';

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
}
