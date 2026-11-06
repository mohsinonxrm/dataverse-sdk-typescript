import type { activitypointer } from './activitypointer.js';

/**
 * adx_portalcomment entity type
 */
export interface adx_portalcomment extends activitypointer {
  _serviceid_value?: string;
  adx_portalcommentdirectioncode?: number;
  importsequencenumber?: number;
  overriddencreatedon?: string;
}
