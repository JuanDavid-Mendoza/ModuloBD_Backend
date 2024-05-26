import { RequirementModel } from '../domain/requirement.model';
import { RequirementProcessModel } from '../domain/requirementProcess.model';
import { PersistRequirementSql } from '../infra/persistRequirement.sql';
import { GetRequirementsSql } from '../infra/getRequirements.sql';
import { format } from 'date-fns';

// Se realiza la lógica pertinente para hacer las peticiones a las clases "Sql" y ajustar las respuestas de las mismas
// Las clases "Model" representan las tablas de la base de datos

export class RequirementsApp {
  async create(data: RequirementModel) {
    const getRequirements = new GetRequirementsSql();
    const persistRequirement = new PersistRequirementSql();

    const lastConsec = await getRequirements.getLastConsec();
    data.CONSECREQUE = lastConsec + 1;

    await persistRequirement.create(data);

    return { createdPK: data.CONSECREQUE };
  }

  async getRequirements() {
    const getRequirements = new GetRequirementsSql();
    const requirements = await getRequirements.getRequirements();

    // A cada requerimiento le agrega sus registros de ProcesoRequerimiento
    if (requirements.length) {
      const reqProcess = await getRequirements.getReqProcessByRequirement(requirements.map((r) => r.CONSECREQUE).join(','));

      if (reqProcess.length) requirements.forEach((req) => {
        req.PROCESS = reqProcess.filter((rp) => rp.CONSECREQUE_FK === req.CONSECREQUE)
      });
    }

    return requirements;
  }

  async getByEmployeeCode(employeeCode: string) {
    const getRequirements = new GetRequirementsSql();
    const requirements = await getRequirements.getByEmployeeCode(employeeCode);

    // A cada requerimiento le agrega sus registros de ProcesoRequerimiento
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
    const persistRequirement = new PersistRequirementSql();
    const getRequirements = new GetRequirementsSql();

    const fases = await getRequirements.getFases();
    const profileFases = await getRequirements.getProfileFases();
    const requirement = await getRequirements.byPK(data.CONSECREQUE_FK!);
    let index = 1;

    // Por cada fase crea un registro en la tabla ProcesoRequerimiento
    for await (const fase of fases) {
      const process: RequirementProcessModel = {
        IDPERFIL_FK: data.IDPERFIL_FK,
        IDFASE_FK: fase.IDFASE,
        CONSECREQUE_FK: data.CONSECREQUE_FK,
        CONSPROCESO: index,
      };

      // Verifica que no exista un registro en la tabla PerfilFase con ese perfil y esa fase
      if (!profileFases.find((pf) => pf.IDPERFIL_FK === data.IDPERFIL_FK && pf.IDFASE_FK === fase.IDFASE)) {
        const profileFase = {
          IDPERFIL_FK: data.IDPERFIL_FK,
          IDFASE_FK: fase.IDFASE,
        };
        
        // Agrega un nuevo registro a la tabla PerfilFase
        await persistRequirement.createProfileFase(profileFase);
      }

      // Si está en la fase 1, "Registrar requerimiento", le agrega la fecha de inicio
      // y el código del analísta cliente que creó el requerimiento
      if (fase.DESFASE?.trim().toUpperCase() === 'REGISTRAR REQUERIMIENTO') {
        process.FECHAINICIO = format(new Date(`${requirement.FECHAREQUE}`), 'dd-MM-yyyy');
        process.CODEMPLEADO_FK = requirement.CODEMPLEADO_FK;
      }

      // Si está en la fase 1, "Asignar perfil", le agrega la fecha de inicio 
      // y el código del analísta cliente que creó el requerimiento
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
    const persistRequirement = new PersistRequirementSql();
    if (data.IDPERFIL_FK && data.IDFASE_FK && data.CONSECREQUE_FK && data.CONSPROCESO) {
      await persistRequirement.updateReqProcess(
        data.IDPERFIL_FK!,
        data.IDFASE_FK!,
        data.CONSECREQUE_FK!,
        data.CONSPROCESO!,
        data.CONVOCATORIA!,
        data.INVITACION!,
        data.FECHAFIN!,
      );
      return { updatedPK: `${data.IDPERFIL_FK} ${data.IDFASE_FK} ${data.CONSECREQUE_FK} ${data.CONSPROCESO}` };
    }
    return { message: 'Llave primaria no encontrada' };
  }
}
