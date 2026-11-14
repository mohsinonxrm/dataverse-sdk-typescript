import type { DateTimeBehaviorValue } from "./metadata-values.js";

/**
 * DateTimeBehavior
 */
export interface DateTimeBehavior {
  Value?: DateTimeBehaviorValue | (string & {});
}
