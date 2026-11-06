import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from ImportSolution action
 */
export interface ImportSolutionResponse {
  // No content returned
}

/**
 * Parameters of the ImportSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionActionParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile: string;
  ImportJobId: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
  SkipQueueRibbonJob?: boolean;
  LayerDesiredOrder?: LayerDesiredOrder;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  IsTemplateMode?: boolean;
  TemplateSuffix?: string;
  SolutionParameters?: SolutionParameters;
  TemplateDisplayNamePrefix?: string;
  StageAndUpgrade?: boolean;
  SchemaUpdatesOnly?: boolean;
}

/**
 * ImportSolution action
 *
 * Unbound action
 */
export class ImportSolutionAction implements Executable<ImportSolutionResponse> {
  constructor(public readonly parameters: ImportSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolution`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.parameters.PublishWorkflows,
      CustomizationFile: this.parameters.CustomizationFile,
      ImportJobId: this.parameters.ImportJobId,
      ConvertToManaged: this.parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.parameters.SkipProductUpdateDependencies,
      HoldingSolution: this.parameters.HoldingSolution,
      SkipQueueRibbonJob: this.parameters.SkipQueueRibbonJob,
      LayerDesiredOrder: enumBody(this.parameters.LayerDesiredOrder, "LayerDesiredOrder"),
      AsyncRibbonProcessing: this.parameters.AsyncRibbonProcessing,
      ComponentParameters: this.parameters.ComponentParameters,
      IsTemplateMode: this.parameters.IsTemplateMode,
      TemplateSuffix: this.parameters.TemplateSuffix,
      SolutionParameters: enumBody(this.parameters.SolutionParameters, "SolutionParameters"),
      TemplateDisplayNamePrefix: this.parameters.TemplateDisplayNamePrefix,
      StageAndUpgrade: this.parameters.StageAndUpgrade,
      SchemaUpdatesOnly: this.parameters.SchemaUpdatesOnly,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportSolutionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportSolutionResponse;
    return (await response.json()) as ImportSolutionResponse;
  }
}
