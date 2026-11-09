import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from the ImportSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImportSolutionAsyncResponse {
  "@odata.context"?: string;
  AsyncOperationId: string;
  ImportJobKey: string;
}

/**
 * Parameters of the ImportSolutionAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionAsyncActionParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile?: string;
  ImportJobId?: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
  SkipQueueRibbonJob?: boolean;
  LayerDesiredOrder?: LayerDesiredOrder;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  SolutionParameters?: SolutionParameters;
  IsTemplateMode?: boolean;
  TemplateSuffix?: string;
  TemplateDisplayNamePrefix?: string;
  StageAndUpgrade?: boolean;
  SchemaUpdatesOnly?: boolean;
}

/**
 * ImportSolutionAsync action
 *
 * Unbound action
 */
export class ImportSolutionAsyncAction implements Executable<ImportSolutionAsyncResponse> {
  constructor(public readonly parameters: ImportSolutionAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutionAsync`;

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
      SolutionParameters: enumBody(this.parameters.SolutionParameters, "SolutionParameters"),
      IsTemplateMode: this.parameters.IsTemplateMode,
      TemplateSuffix: this.parameters.TemplateSuffix,
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

  async parseResponse(response: Response): Promise<ImportSolutionAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ImportSolutionAsyncResponse;
  }
}
