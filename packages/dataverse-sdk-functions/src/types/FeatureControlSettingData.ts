import type { Object } from "./Object.js";
import type { _Type } from "./Type.js";

/**
 * FeatureControlSettingData complex type
 */
export interface FeatureControlSettingData {
  Type?: _Type;
  Value?: Object;
  Name?: string;
  NamespaceValue?: string;
}
