import type { Object } from "./Object.js";
import type { Type } from "./Type.js";

/**
 * FeatureControlSettingData
 */
export interface FeatureControlSettingData {
  Type?: Type;
  Value?: Object;
  Name?: string;
  NamespaceValue?: string;
}
