import type { ScalarInputParameter } from "./ScalarInputParameter.js";

/**
 * DirectEntryContext
 */
export interface DirectEntryContext {
  SparkConfiguration?: ScalarInputParameter[];
  Arguments?: string[];
  FileName?: string;
  ClassName?: string;
  Archives?: string[];
}
