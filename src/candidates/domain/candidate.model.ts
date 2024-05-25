import { HVModel } from "./hv.model";

export class CandidateModel {
  USUARIO? : string | null = null;
  IDTIPODOC_FK? : string | null = null;
  NOMBRE? : string | null = null;
  APELLIDO? : string | null = null;
  FECHANACCAND? : string | null = null;
  NDOC? : number | null = null;
  HVS?: HVModel[] | null = null;
}
