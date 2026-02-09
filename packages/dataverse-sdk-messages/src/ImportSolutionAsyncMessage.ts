import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * ImportSolutionAsync request message
 *
 * Web API Action: ImportSolutionAsync
 */
export class ImportSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionAsyncResponse>
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
    public solutionParameters: SolutionParameters,
    public isTemplateMode: boolean,
    public templateSuffix: string,
    public templateDisplayNamePrefix: string,
    public stageAndUpgrade: boolean,
    public schemaUpdatesOnly: boolean
  ) {
    super("ImportSolutionAsync");
  }

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
      LayerDesiredOrder: this.layerDesiredOrder,
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      SolutionParameters: this.solutionParameters,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportSolutionAsyncResponse> {
    const data = await response.json();
    return ImportSolutionAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
      SolutionParameters: this.solutionParameters,
      IsTemplateMode: this.isTemplateMode,
      TemplateSuffix: this.templateSuffix,
      TemplateDisplayNamePrefix: this.templateDisplayNamePrefix,
      StageAndUpgrade: this.stageAndUpgrade,
      SchemaUpdatesOnly: this.schemaUpdatesOnly,
    };
  }
}

/**
 * ImportSolutionAsync response message
 */
export class ImportSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: ImportSolutionAsyncResponse) {
    super("ImportSolutionAsync");
  }

  static fromResponse(data: unknown): ImportSolutionAsyncResponse {
    return new ImportSolutionAsyncResponse((data as any).value);
  }
}
