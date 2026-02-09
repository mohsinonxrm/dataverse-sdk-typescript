import type { EndpointType } from "./EndpointType.js";

/**
 * EndpointCollection complex type
 */
export interface EndpointCollection {
  Count: number;
  IsReadOnly: boolean;
  Keys: EndpointType[];
  Values: string[];
}
