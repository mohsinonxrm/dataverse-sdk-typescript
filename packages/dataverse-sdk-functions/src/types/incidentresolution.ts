import type { activitypointer } from "./activitypointer.js";

/**
 * incidentresolution entity type
 */
export interface incidentresolution extends activitypointer {
  _createdbyexternalparty_value?: string;
  _incidentid_value?: string;
  _modifiedbyexternalparty_value?: string;
  category?: string;
  importsequencenumber?: number;
  msdyn_proposeknowledge?: boolean;
  overriddencreatedon?: string;
  resolutiontypecode?: number;
  subcategory?: string;
  timespent?: number;
  totaltimespent?: number;
}
