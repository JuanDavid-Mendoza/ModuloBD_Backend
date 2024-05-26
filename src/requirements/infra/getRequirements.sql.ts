import {
  executeQuery,
  first,
} from '../../shared/db.oracle';
import { RequirementModel } from '../domain/requirement.model';
import { FaseModel } from '../domain/fase.model';
import { RequirementProcessModel } from '../domain/requirementProcess.model';
import { ProfileFaseModel } from '../domain/profileFase.model';

export class GetRequirementsSql {
  async byPK(requirementPK: number): Promise<RequirementModel> {
    const requirement = await first(
      `SELECT R.* FROM REQUERIMIENTO R
        WHERE R.CONSECREQUE = ${requirementPK}`
    );

    return requirement;
  }

  async getRequirements(): Promise<RequirementModel[]> {
    const requirements = await executeQuery(
      `SELECT R.* FROM REQUERIMIENTO R`
    );

    return requirements;
  }
  
  async getLastConsec(): Promise<number> {
    // Obtiene el último consecutivo de los requerimientos actuales en la base de datos
    const consec = await executeQuery(
      `SELECT R.CONSECREQUE FROM REQUERIMIENTO R ORDER BY R.CONSECREQUE DESC`
    ).then((r) => r.length ? r[0].CONSECREQUE : 1);

    return consec;
  }

  async getByEmployeeCode(codEmployee: string): Promise<RequirementModel[]> {
    const requirements = await executeQuery(
      `SELECT R.* FROM REQUERIMIENTO R
        WHERE R.CODEMPLEADO_FK2 = '${codEmployee}'`
    );

    return requirements;
  }

  async getFases(): Promise<FaseModel[]> {
    const fases = await executeQuery(
      `SELECT F.* FROM FASE F`
    );

    return fases;
  }

  async getProfileFases(): Promise<ProfileFaseModel[]> {
    const result = await executeQuery(
      `SELECT PF.* FROM PERFILFASE PF`
    );

    return result;
  }

  async getReqProcessByRequirement(requirements: string): Promise<RequirementProcessModel[]> {
    const reqProcesses = await executeQuery(
      `SELECT PR.*, P.DESPERFIL, D.DESCDISCIPLINA, F.DESFASE FROM PROCESOREQUERIMIENTO PR
        INNER JOIN PERFIL P ON P.IDPERFIL = PR.IDPERFIL_FK
        INNER JOIN DISCIPLINA D ON D.IDDISCIPLINA = P.IDDISCIPLINA_FK
        INNER JOIN FASE F ON F.IDFASE = PR.IDFASE_FK
        WHERE PR.CONSECREQUE_FK IN (${requirements}) ORDER BY PR.CONSPROCESO`
    );

    return reqProcesses;
  }
}
