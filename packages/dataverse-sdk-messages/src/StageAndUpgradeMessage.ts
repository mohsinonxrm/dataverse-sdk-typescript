import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * StageAndUpgrade request message
 *
 * Web API Action: StageAndUpgrade
 */
export class StageAndUpgradeRequest
  extends OrganizationRequest
  implements Executable<StageAndUpgradeResponse>
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
    super("StageAndUpgrade");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgrade`;

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<StageAndUpgradeResponse> {
    const data = await response.json();
    return StageAndUpgradeResponse.fromResponse(data);
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
 * StageAndUpgrade response message
 */
export class StageAndUpgradeResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeResponse) {
    super("StageAndUpgrade");
  }

  static fromResponse(data: unknown): StageAndUpgradeResponse {
    return new StageAndUpgradeResponse((data as any).value);
  }
}
