import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * StageAndUpgradeAsync request message
 *
 * Web API Action: StageAndUpgradeAsync
 */
export class StageAndUpgradeAsyncRequest
  extends OrganizationRequest
  implements Executable<StageAndUpgradeAsyncResponse>
{
  constructor(
    public overwriteUnmanagedCustomizations: boolean,
    public publishWorkflows: boolean,
    public customizationFile: string,
    public importJobId: string,
    public convertToManaged: boolean,
    public skipProductUpdateDependencies: boolean,
    public skipQueueRibbonJob: boolean,
    public asyncRibbonProcessing: boolean,
    public componentParameters: Record<string, unknown>[],
    public solutionParameters: SolutionParameters,
    public layerDesiredOrder: LayerDesiredOrder,
    public schemaUpdatesOnly: boolean
  ) {
    super("StageAndUpgradeAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgradeAsync`;

    const body: Record<string, unknown> = {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFile: this.customizationFile,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      SkipQueueRibbonJob: this.skipQueueRibbonJob,
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      SolutionParameters: this.solutionParameters,
      LayerDesiredOrder: this.layerDesiredOrder,
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

  async parseResponse(response: Response): Promise<StageAndUpgradeAsyncResponse> {
    const data = await response.json();
    return StageAndUpgradeAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFile: this.customizationFile,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      SkipQueueRibbonJob: this.skipQueueRibbonJob,
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      SolutionParameters: this.solutionParameters,
      LayerDesiredOrder: this.layerDesiredOrder,
      SchemaUpdatesOnly: this.schemaUpdatesOnly,
    };
  }
}

/**
 * StageAndUpgradeAsync response message
 */
export class StageAndUpgradeAsyncResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeAsyncResponse) {
    super("StageAndUpgradeAsync");
  }

  static fromResponse(data: unknown): StageAndUpgradeAsyncResponse {
    return new StageAndUpgradeAsyncResponse((data as any).value);
  }
}
