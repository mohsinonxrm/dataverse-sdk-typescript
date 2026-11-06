import type { Object } from "./Object.js";
import type { _Type } from "./Type.js";

/**
 * FeatureControlSettingData complex type
 */
export interface FeatureControlSettingData {
  Name?: string;
  NamespaceValue?: string;
  Type?: _Type;
  Value?: Object;
}
