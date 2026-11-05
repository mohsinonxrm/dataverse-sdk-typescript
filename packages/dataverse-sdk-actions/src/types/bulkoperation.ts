import type { activitypointer } from "./activitypointer.js";

/**
 * bulkoperation entity type
 */
export interface bulkoperation extends activitypointer {
  bulkoperationnumber?: string;
  importsequencenumber?: number;
  parameters?: string;
  successcount?: number;
  targetedrecordtypecode?: number;
  operationtypecode?: number;
  workflowinfo?: string;
  targetmemberscount?: number;
  overriddencreatedon?: string;
  errornumber?: number;
  createdrecordtypecode?: number;
  failurecount?: number;
}
