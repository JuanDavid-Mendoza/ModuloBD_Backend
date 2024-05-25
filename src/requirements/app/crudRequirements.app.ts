import { RequirementModel } from '../domain/requirement.model';
import { RequirementProcessModel } from '../domain/requirementProcess.model';
import { PersistRequirementMysql } from '../infra/persistRequirement.mysql';
import { GetRequirementsMysql } from '../infra/getRequirements.mysql';
import { format, parseISO } from 'date-fns';

export class CrudRequirementsApp {
  async create(data: RequirementModel) {
    const getRequirements = new GetRequirementsMysql();
    const persistRequirement = new PersistRequirementMysql();

    const lastConsec = await getRequirements.getLastConsec();
    data.CONSECREQUE = lastConsec + 1;

    await persistRequirement.create(data);

    return { createdPK: data.CONSECREQUE };
  }

  async getRequirements() {
    const getRequirements = new GetRequirementsMysql();
    const requirements = await getRequirements.getRequirements();
    const reqProcess = await getRequirements.getReqProcessByRequirement(requirements.map((r) => r.CONSECREQUE).join(','));

    requirements.forEach((req) => {
      req.PROCESS = reqProcess.filter((rp) => rp.CONSECREQUE_FK === req.CONSECREQUE)
    });

    return requirements;
  }

  async getByEmployeeCode(employeeCode: string) {
    const getRequirements = new GetRequirementsMysql();
    const requirements = await getRequirements.getByEmployeeCode(employeeCode);

    if (requirements.length) {
      const reqProcess = await getRequirements.getReqProcessByRequirement(requirements.map((r) => r.CONSECREQUE).join(','));

      if (reqProcess.length) requirements.forEach((req) => {
        req.PROCESS = reqProcess.filter((rp) => rp.CONSECREQUE_FK === req.CONSECREQUE)
      });
    }

    return requirements;
  }

  async createReqProcesses(data: RequirementProcessModel) {
    if (!data.CONSECREQUE_FK || !data.IDPERFIL_FK) return { message: 'Datos incompletos' };
    const persistRequirement = new PersistRequirementMysql();
    const getRequirements = new GetRequirementsMysql();

    const fases = await getRequirements.getFases();
    const profileFases = await getRequirements.getProfileFases();
    const requirement = await getRequirements.byPK(data.CONSECREQUE_FK!);
    let index = 1;

    for await (const fase of fases) {
      const process: RequirementProcessModel = {
        IDPERFIL_FK: data.IDPERFIL_FK,
        IDFASE_FK: fase.IDFASE,
        CONSECREQUE_FK: data.CONSECREQUE_FK,
        CONSPROCESO: index,
      };

      if (!profileFases.find((pf) => pf.IDPERFIL_FK === data.IDPERFIL_FK && pf.IDFASE_FK === fase.IDFASE)) {
        const profileFase = {
          IDPERFIL_FK: data.IDPERFIL_FK,
          IDFASE_FK: fase.IDFASE,
        };
        
        await persistRequirement.createProfileFase(profileFase);
      }

      if (fase.DESFASE?.trim().toUpperCase() === 'REGISTRAR REQUERIMIENTO') {
        process.FECHAINICIO = format(new Date(`${requirement.FECHAREQUE}`), 'dd-MM-yyyy');
        process.CODEMPLEADO_FK = requirement.CODEMPLEADO_FK;
      }

      if (fase.DESFASE?.trim().toUpperCase() === 'ASIGNAR PERFIL') {
        process.FECHAINICIO = data.FECHAINICIO;
        process.CODEMPLEADO_FK = requirement.CODEMPLEADO_FK2;
      }

      await persistRequirement.createReqProcess(process);

      index++;
    }

    return { createdPK: true };
  }

  async updateReqProcess(data: RequirementProcessModel) {
    const persistRequirement = new PersistRequirementMysql();
    if (data.IDPERFIL_FK && data.IDFASE_FK && data.CONSECREQUE_FK && data.CONSPROCESO) {
      await persistRequirement.updateReqProcess(
        data.IDPERFIL_FK!,
        data.IDFASE_FK!,
        data.CONSECREQUE_FK!,
        data.CONSPROCESO!,
        data.CONVOCATORIA!,
        data.INVITACION!,
      );
      return { updatedPK: `${data.IDPERFIL_FK} ${data.IDFASE_FK} ${data.CONSECREQUE_FK} ${data.CONSPROCESO}` };
    }
    return { message: 'Llave primaria no encontrada' };
  }

  async sendEmail(data: RequirementModel) {
    const persistRequirement = new PersistRequirementMysql();
    const isSent = await persistRequirement.sendEmail(data);

    return isSent ? { createdPK: data.CONSECREQUE } : { message: 'Datos incompletos' };
  }
}
