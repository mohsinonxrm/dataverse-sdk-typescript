import type { EndpointType } from "./EndpointType.js";

/**
 * EndpointCollection
 */
export interface EndpointCollection {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: EndpointType[];
  Values: string[];
}
