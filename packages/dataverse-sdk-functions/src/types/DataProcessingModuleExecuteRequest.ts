import type { DirectEntryContext } from "./DirectEntryContext.js";
import type { DynamicAllocationSettings } from "./DynamicAllocationSettings.js";
import type { ModuleRunIncrementalSettings } from "./ModuleRunIncrementalSettings.js";
import type { ModuleRunOutputInfo } from "./ModuleRunOutputInfo.js";
import type { ScalarInputParameter } from "./ScalarInputParameter.js";
import type { UpstreamResultInput } from "./UpstreamResultInput.js";

/**
 * DataProcessingModuleExecuteRequest complex type
 */
export interface DataProcessingModuleExecuteRequest {
  CallbackUri?: string;
  DataProcessingConfigurationId?: string;
  DirectEntryContext?: DirectEntryContext;
  DynamicAllocationSettings?: DynamicAllocationSettings;
  EndPoints?: string[];
  JobArguments?: string[];
  JobName?: string;
  ModuleConfigurationJson?: string;
  ModuleRunId?: string;
  ModuleRunIncrementalSettings?: ModuleRunIncrementalSettings;
  ModuleRunOutputInfo?: ModuleRunOutputInfo;
  OverrideApplicationId?: string;
  ScalarInputs?: ScalarInputParameter[];
  Script?: string;
  UpstreamResults?: UpstreamResultInput[];
}
