import type { Object } from "./Object.js";

/**
 * ParameterCollection
 */
export interface ParameterCollection {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: Object[];
}
