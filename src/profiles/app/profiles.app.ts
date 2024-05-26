import { ProfileModel } from '../domain/profile.model';
import { PersistProfileSql } from '../infra/persistProfile.sql';
import { GetProfilesSql } from '../infra/getProfiles.sql';

// Se realiza la lógica pertinente para hacer las peticiones a las clases "Sql" y ajustar las respuestas de las mismas
// Las clases "Model" representan las tablas de la base de datos

export class ProfilesApp {
  async create(data: ProfileModel) {
    const getProfiles = new GetProfilesSql();
    const previous = await getProfiles.byPK(data.IDPERFIL!);
    if (previous) return { message: 'El perfil ya existe en el sistema' }

    const persistProfile = new PersistProfileSql();
    await persistProfile.create(data);

    return { createdPK: data.IDPERFIL };
  }

  getProfiles() {
    const getProfiles = new GetProfilesSql();
    return getProfiles.getProfiles();
  }
}
