import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from ImportSolutionAsync action
 */
export interface ImportSolutionAsyncResponse {
  ImportJobKey: string;
  AsyncOperationId: string;
}

/**
 * ImportSolutionAsync action
 *
 * Unbound action
 */
export class ImportSolutionAsyncAction implements Executable<ImportSolutionAsyncResponse> {
  constructor(
    public readonly overwriteUnmanagedCustomizations: boolean,
    public readonly publishWorkflows: boolean,
    public readonly customizationFile?: string,
    public readonly importJobId?: string,
    public readonly convertToManaged?: boolean,
    public readonly skipProductUpdateDependencies?: boolean,
    public readonly holdingSolution?: boolean,
    public readonly skipQueueRibbonJob?: boolean,
    public readonly layerDesiredOrder?: LayerDesiredOrder,
    public readonly asyncRibbonProcessing?: boolean,
    public readonly componentParameters?: Record<string, unknown>[],
    public readonly solutionParameters?: SolutionParameters,
    public readonly isTemplateMode?: boolean,
    public readonly templateSuffix?: string,
    public readonly templateDisplayNamePrefix?: string,
    public readonly stageAndUpgrade?: boolean,
    public readonly schemaUpdatesOnly?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutionAsync`;

    const body: Record<string, unknown> = {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFile: this.customizationFile,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      HoldingSolution: this.holdingSolution,
      SkipQueueRibbonJob: this.skipQueueRibbonJob,
      LayerDesiredOrder: enumBody(this.layerDesiredOrder, "LayerDesiredOrder"),
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      SolutionParameters: enumBody(this.solutionParameters, "SolutionParameters"),
      IsTemplateMode: this.isTemplateMode,
      TemplateSuffix: this.templateSuffix,
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

  async parseResponse(response: Response): Promise<ImportSolutionAsyncResponse> {
    const data = await response.json();
    return data as ImportSolutionAsyncResponse;
  }
}
