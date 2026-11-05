import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * ImportSolution request message
 *
 * Web API Action: ImportSolution
 */
export class ImportSolutionRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionResponse>
{
  constructor(
    public overwriteUnmanagedCustomizations: boolean,
    public publishWorkflows: boolean,
    public customizationFile: string,
    public importJobId: string,
    public convertToManaged: boolean,
    public skipProductUpdateDependencies: boolean,
    public holdingSolution: boolean,
    public skipQueueRibbonJob: boolean,
    public layerDesiredOrder: LayerDesiredOrder,
    public asyncRibbonProcessing: boolean,
    public componentParameters: Record<string, unknown>[],
    public isTemplateMode: boolean,
    public templateSuffix: string,
    public solutionParameters: SolutionParameters,
    public templateDisplayNamePrefix: string,
    public stageAndUpgrade: boolean,
    public schemaUpdatesOnly: boolean
  ) {
    super("ImportSolution");
  }

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
    return new ImportSolutionResponse();
  }
}

/**
 * ImportSolution response message
 */
export class ImportSolutionResponse extends OrganizationResponse {
  constructor() {
    super("ImportSolution");
  }

  static fromResponse(_data: unknown): ImportSolutionResponse {
    return new ImportSolutionResponse();
  }
}
