import type { activitypointer } from "./activitypointer.js";

/**
 * msdyn_copilottranscript entity type
 */
export interface msdyn_copilottranscript extends activitypointer {
  msdyn_copilotmode?: string;
  msdyn_transcriptforlogicalname?: string;
  msdyn_copilotskill?: string;
  msdyn_additionalcontext?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  msdyn_transcriptforid?: string;
}
