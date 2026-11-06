import type { activitypointer } from './activitypointer.js';

/**
 * msdyn_copilottranscript entity type
 */
export interface msdyn_copilottranscript extends activitypointer {
  importsequencenumber?: number;
  msdyn_additionalcontext?: string;
  msdyn_copilotmode?: string;
  msdyn_copilotskill?: string;
  msdyn_transcriptforid?: string;
  msdyn_transcriptforlogicalname?: string;
  overriddencreatedon?: string;
}
