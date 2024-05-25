import { ProfileModel } from '../domain/profile.model';
import { PersistProfileMysql } from '../infra/persistProfile.mysql';
import { GetProfilesMysql } from '../infra/getProfiles.mysql';

export class CrudProfilesApp {
  async create(data: ProfileModel) {
    const getProfiles = new GetProfilesMysql();
    const previous = await getProfiles.byPK(data.IDPERFIL!);
    if (previous) return { message: 'El perfil ya existe en el sistema' }

    const persistProfile = new PersistProfileMysql();
    await persistProfile.create(data);

    return { createdPK: data.IDPERFIL };
  }

  getProfiles() {
    const getProfiles = new GetProfilesMysql();
    return getProfiles.getProfiles();
  }
}
