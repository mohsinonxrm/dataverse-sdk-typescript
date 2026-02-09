import type { DirectEntryContext } from "./DirectEntryContext.js";
import type { DynamicAllocationSettings } from "./DynamicAllocationSettings.js";
import type { ModuleRunIncrementalSettings } from "./ModuleRunIncrementalSettings.js";
import type { ModuleRunOutputInfo } from "./ModuleRunOutputInfo.js";
import type { ScalarInputParameter } from "./ScalarInputParameter.js";
import type { UpstreamResultInput } from "./UpstreamResultInput.js";

/**
 * DataProcessingModuleExecuteRequest
 */
export interface DataProcessingModuleExecuteRequest {
  DataProcessingConfigurationId?: string;
  EndPoints?: string[];
  JobName?: string;
  Script?: string;
  JobArguments?: string[];
  ScalarInputs?: ScalarInputParameter[];
  CallbackUri?: string;
  UpstreamResults?: UpstreamResultInput[];
  OverrideApplicationId?: string;
  DirectEntryContext?: DirectEntryContext;
  ModuleConfigurationJson?: string;
  ModuleRunId?: string;
  ModuleRunIncrementalSettings?: ModuleRunIncrementalSettings;
  ModuleRunOutputInfo?: ModuleRunOutputInfo;
  DynamicAllocationSettings?: DynamicAllocationSettings;
}
