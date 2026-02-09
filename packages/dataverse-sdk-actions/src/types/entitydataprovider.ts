import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entitydataprovider entity type
 */
export interface entitydataprovider {
  introducedversion: string;
  bulkretainplugin: string;
  ismanaged: boolean;
  iscustomizable: BooleanManagedProperty;
  retainplugin: string;
  name: string;
  archiveplugin: string;
  validateretentionconfigplugin: string;
  componentstate: number;
  overwritetime: string;
  bulkarchiveplugin: string;
  purgeretainedcontentplugin: string;
  upsertplugin: string;
  updateplugin: string;
  validatearchiveconfigplugin: string;
  retrievemultipleplugin: string;
  deletemultipleplugin: string;
  deleteplugin: string;
  upsertmultipleplugin: string;
  purgearchivedcontentplugin: string;
  createplugin: string;
  updatemultipleplugin: string;
  description: string;
  datasourcelogicalname: string;
  entitydataproviderid: string;
  solutionid: string;
  retrieveplugin: string;
  retrieveentitychangesplugin: string;
  rollbackretainplugin: string;
  createmultipleplugin: string;
  organizationid: string;
  lookupexpansionenabled: boolean;
  entitydataprovideridunique: string;
}
