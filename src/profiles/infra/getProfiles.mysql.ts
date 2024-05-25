import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { ProfileModel } from '../domain/profile.model';

export class GetProfilesMysql {
  async byPK(profilePK: string): Promise<ProfileModel> {
    const profile = await first(
      `SELECT P.* FROM PERFIL P
        WHERE P.IDPERFIL = '${profilePK}'`
    );

    return profile;
  }

  async getProfiles(): Promise<ProfileModel[]> {
    const profiles = await executeQuery(
      `SELECT P.*, D.DESCDISCIPLINA FROM PERFIL P
        INNER JOIN DISCIPLINA D ON D.IDDISCIPLINA = P.IDDISCIPLINA_FK`
    );

    return profiles;
  }
}
