import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  LayerDesiredOrder,
  SolutionParameters,
  StageAndUpgradeAsyncResponse as StageAndUpgradeAsyncResponseData,
} from "./types/index.js";

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
    public customizationFile?: string,
    public importJobId?: string,
    public convertToManaged?: boolean,
    public skipProductUpdateDependencies?: boolean,
    public skipQueueRibbonJob?: boolean,
    public asyncRibbonProcessing?: boolean,
    public componentParameters?: Record<string, unknown>[],
    public solutionParameters?: SolutionParameters,
    public layerDesiredOrder?: LayerDesiredOrder,
    public schemaUpdatesOnly?: boolean
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
      SolutionParameters: enumBody(this.solutionParameters, "SolutionParameters"),
      LayerDesiredOrder: enumBody(this.layerDesiredOrder, "LayerDesiredOrder"),
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
}

/**
 * StageAndUpgradeAsync response message
 */
export class StageAndUpgradeAsyncResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeAsyncResponseData) {
    super("StageAndUpgradeAsync");
  }

  static fromResponse(data: unknown): StageAndUpgradeAsyncResponse {
    return new StageAndUpgradeAsyncResponse(responseObject<StageAndUpgradeAsyncResponseData>(data));
  }
}
