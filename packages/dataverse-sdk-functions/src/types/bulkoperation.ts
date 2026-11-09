import type { activitypointer } from "./activitypointer.js";

/**
 * bulkoperation entity type
 */
export interface bulkoperation extends activitypointer {
  bulkoperationnumber?: string;
  createdrecordtypecode?: number;
  errornumber?: number;
  failurecount?: number;
  importsequencenumber?: number;
  operationtypecode?: number;
  overriddencreatedon?: string;
  parameters?: string;
  parametersv2?: string;
  successcount?: number;
  targetedrecordtypecode?: number;
  targetmemberscount?: number;
  workflowinfo?: string;
}
