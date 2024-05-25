export class CandidateProcessModel {
  USUARIO_FK? : string | null = null;
  IDPERFIL_FK? : string | null = null;
  IDFASE_FK? : string | null = null;
  CONSECREQUE_FK? : number | null = null;
  CONSPROCESO_FK? : number | null = null;
  FECHAPRESENTACION? : string | null = null;
  ANALISIS?: string | null = null;
  OBSERVACION?: string | null = null;
  USERS?: string[] | null = null;
}
