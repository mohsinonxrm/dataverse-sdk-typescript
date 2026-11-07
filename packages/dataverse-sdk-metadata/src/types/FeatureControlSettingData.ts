import type { Object } from "./Object.js";
import type { Type } from "./Type.js";

/**
 * FeatureControlSettingData
 */
export interface FeatureControlSettingData {
  Name?: string;
  NamespaceValue?: string;
  Type?: Type;
  Value?: Object;
}
