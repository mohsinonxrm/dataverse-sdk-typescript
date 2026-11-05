import type { activitypointer } from "./activitypointer.js";

/**
 * incidentresolution entity type
 */
export interface incidentresolution extends activitypointer {
  importsequencenumber?: number;
  _incidentid_value?: string;
  totaltimespent?: number;
  msdyn_proposeknowledge?: boolean;
  subcategory?: string;
  _modifiedbyexternalparty_value?: string;
  resolutiontypecode?: number;
  category?: string;
  overriddencreatedon?: string;
  timespent?: number;
  _createdbyexternalparty_value?: string;
}
