import type { ScalarInputParameter } from "./ScalarInputParameter.js";

/**
 * DirectEntryContext
 */
export interface DirectEntryContext {
  Archives?: string[];
  Arguments?: string[];
  ClassName?: string;
  FileName?: string;
  SparkConfiguration?: ScalarInputParameter[];
}
