import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from ImportSolution action
 */
export interface ImportSolutionResponse {
  // No content returned
}

/**
 * ImportSolution action
 *
 * Unbound action
 */
export class ImportSolutionAction implements Executable<ImportSolutionResponse> {
  constructor(
    public readonly overwriteUnmanagedCustomizations: boolean,
    public readonly publishWorkflows: boolean,
    public readonly customizationFile: string,
    public readonly importJobId: string,
    public readonly convertToManaged?: boolean,
    public readonly skipProductUpdateDependencies?: boolean,
    public readonly holdingSolution?: boolean,
    public readonly skipQueueRibbonJob?: boolean,
    public readonly layerDesiredOrder?: LayerDesiredOrder,
    public readonly asyncRibbonProcessing?: boolean,
    public readonly componentParameters?: Record<string, unknown>[],
    public readonly isTemplateMode?: boolean,
    public readonly templateSuffix?: string,
    public readonly solutionParameters?: SolutionParameters,
    public readonly templateDisplayNamePrefix?: string,
    public readonly stageAndUpgrade?: boolean,
    public readonly schemaUpdatesOnly?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolution`;

    const body: Record<string, unknown> = {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFile: this.customizationFile,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      HoldingSolution: this.holdingSolution,
      SkipQueueRibbonJob: this.skipQueueRibbonJob,
      LayerDesiredOrder: this.layerDesiredOrder,
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      IsTemplateMode: this.isTemplateMode,
      TemplateSuffix: this.templateSuffix,
      SolutionParameters: this.solutionParameters,
      TemplateDisplayNamePrefix: this.templateDisplayNamePrefix,
      StageAndUpgrade: this.stageAndUpgrade,
      SchemaUpdatesOnly: this.schemaUpdatesOnly,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
