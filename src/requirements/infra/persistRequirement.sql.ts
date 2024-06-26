import {
  executeQuery,
} from '../../shared/db.oracle';
import { RequirementModel } from '../domain/requirement.model';
import { RequirementProcessModel } from '../domain/requirementProcess.model';
import { ProfileFaseModel } from '../domain/profileFase.model';

export class PersistRequirementSql {
  async create(data: RequirementModel): Promise<number> {
    data.CODEMPLEADO_FK2 = data.CODEMPLEADO_FK2 ? ` '${data.CODEMPLEADO_FK2}' ` : null;
    data.SALARIOMIN = data.SALARIOMIN || null;

    const result = await executeQuery(
      `INSERT INTO REQUERIMIENTO (CONSECREQUE, CODEMPLEADO_FK, CODEMPLEADO_FK2, FECHAREQUE, SALARIOMAX, SALARIOMIN,
        DESFUNCION, DESCARRERAS, NVACANTES) VALUES (${data.CONSECREQUE}, '${data.CODEMPLEADO_FK}', 
        ${data.CODEMPLEADO_FK2}, TO_DATE('${data.FECHAREQUE}', 'DD-MM-YYYY'), ${data.SALARIOMAX}, ${data.SALARIOMIN}, 
        '${data.DESFUNCION}', '${data.DESCARRERAS}', ${data.NVACANTES})`
    );

    return result;
  }

  async createReqProcess(data: RequirementProcessModel): Promise<number> {
    data.CODEMPLEADO_FK =  data.CODEMPLEADO_FK ? ` '${data.CODEMPLEADO_FK}' ` : null;
    data.FECHAINICIO =  data.FECHAINICIO ? ` TO_DATE('${data.FECHAINICIO}', 'DD-MM-YYYY') ` : null;
    data.FECHAFIN =  data.FECHAFIN ? ` TO_DATE('${data.FECHAFIN}', 'DD-MM-YYYY') ` : null;
    data.CONVOCATORIA =  data.CONVOCATORIA ? ` '${data.CONVOCATORIA}' ` : null;
    data.INVITACION =  data.INVITACION ? ` '${data.INVITACION}' ` : null;

    const result = await executeQuery(
      `INSERT INTO PROCESOREQUERIMIENTO (IDPERFIL_FK, IDFASE_FK, CONSECREQUE_FK, CONSPROCESO, CODEMPLEADO_FK,
        FECHAINICIO, FECHAFIN, CONVOCATORIA, INVITACION) VALUES ('${data.IDPERFIL_FK}', '${data.IDFASE_FK}', 
        ${data.CONSECREQUE_FK}, ${data.CONSPROCESO}, ${data.CODEMPLEADO_FK}, ${data.FECHAINICIO}, 
        ${data.FECHAFIN}, ${data.CONVOCATORIA}, ${data.INVITACION})`
    );

    return result;
  }

  async createProfileFase(data: ProfileFaseModel): Promise<number> {
    const result = await executeQuery(
      `INSERT INTO PERFILFASE (IDPERFIL_FK, IDFASE_FK) VALUES ('${data.IDPERFIL_FK}', '${data.IDFASE_FK}')`
    );

    return result;
  }

  async updateReqProcess(profileId: string, faseId: string, reqC: number, proC: number, call: string, invitation: string, endDate: string): Promise<number> {
    if (!call && !invitation && !endDate) return 0;

    let auxUpdate = '';
    if (endDate) auxUpdate = `FECHAFIN = TO_DATE('${endDate}', 'DD-MM-YYYY')`; // Actualiza la fecha de fin
    if (call) auxUpdate = `CONVOCATORIA = '${call}'`; // Actualiza la convocatoria
    if (invitation) auxUpdate = `INVITACION = '${invitation}'`; // Actualiza la invitacion

    const result = await executeQuery(
      `UPDATE PROCESOREQUERIMIENTO SET ${auxUpdate}
        WHERE IDPERFIL_FK = '${profileId}' AND IDFASE_FK = '${faseId}'
        AND CONSECREQUE_FK = ${reqC} AND CONSPROCESO = ${proC}`
    );

    return result;
  }
}
