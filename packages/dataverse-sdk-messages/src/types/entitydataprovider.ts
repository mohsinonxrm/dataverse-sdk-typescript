import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entitydataprovider entity type
 */
export interface entitydataprovider {
  archiveplugin?: string;
  bulkarchiveplugin?: string;
  bulkretainplugin?: string;
  componentstate?: number;
  createmultipleplugin?: string;
  createplugin?: string;
  datasourcelogicalname?: string;
  deletemultipleplugin?: string;
  deleteplugin?: string;
  description?: string;
  entitydataproviderid?: string;
  entitydataprovideridunique?: string;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  lookupexpansionenabled?: boolean;
  name?: string;
  organizationid?: string;
  overwritetime?: string;
  purgearchivedcontentplugin?: string;
  purgeretainedcontentplugin?: string;
  retainplugin?: string;
  retrieveentitychangesplugin?: string;
  retrievemultipleplugin?: string;
  retrieveplugin?: string;
  rollbackretainplugin?: string;
  solutionid?: string;
  updatemultipleplugin?: string;
  updateplugin?: string;
  upsertmultipleplugin?: string;
  upsertplugin?: string;
  validatearchiveconfigplugin?: string;
  validateretentionconfigplugin?: string;
}
