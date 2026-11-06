import type { Object } from "./Object.js";

/**
 * InputArgument complex type
 */
export interface InputArgument {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: Object[];
}
