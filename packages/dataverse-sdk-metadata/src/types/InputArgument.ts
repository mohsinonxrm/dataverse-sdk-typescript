import type { Object } from "./Object.js";

/**
 * InputArgument
 */
export interface InputArgument {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: Object[];
}
