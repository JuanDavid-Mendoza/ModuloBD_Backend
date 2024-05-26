import {
  executeQuery,
} from '../../shared/db.oracle';
import { ProfileModel } from '../domain/profile.model';

export class PersistProfileSql {
  async create(data: ProfileModel): Promise<number> {
    const result = await executeQuery(
      `INSERT INTO PERFIL (IDPERFIL, IDDISCIPLINA_FK, DESPERFIL) 
        VALUES ('${data.IDPERFIL}', '${data.IDDISCIPLINA_FK}', '${data.DESPERFIL}')`
    );

    return result;
  }
}
