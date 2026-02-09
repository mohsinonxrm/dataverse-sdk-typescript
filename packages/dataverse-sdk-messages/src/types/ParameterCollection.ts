import type { Object } from "./Object.js";

/**
 * ParameterCollection complex type
 */
export interface ParameterCollection {
  Count: number;
  IsReadOnly: boolean;
  Keys: string[];
  Values: Object[];
}
