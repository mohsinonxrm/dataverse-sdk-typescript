import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Parameters of the StageAndUpgradeAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageAndUpgradeAsyncRequestParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile?: string;
  ImportJobId?: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  SkipQueueRibbonJob?: boolean;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  SolutionParameters?: SolutionParameters;
  LayerDesiredOrder?: LayerDesiredOrder;
  SchemaUpdatesOnly?: boolean;
}

/**
 * StageAndUpgradeAsync request message
 *
 * Web API Action: StageAndUpgradeAsync
 */
export class StageAndUpgradeAsyncRequest
  extends OrganizationRequest
  implements Executable<StageAndUpgradeAsyncResponse>
{
  declare readonly Parameters: Readonly<StageAndUpgradeAsyncRequestParameters>;

  constructor(parameters: StageAndUpgradeAsyncRequestParameters) {
    super("StageAndUpgradeAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgradeAsync`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.Parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.Parameters.PublishWorkflows,
      CustomizationFile: this.Parameters.CustomizationFile,
      ImportJobId: this.Parameters.ImportJobId,
      ConvertToManaged: this.Parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.Parameters.SkipProductUpdateDependencies,
      SkipQueueRibbonJob: this.Parameters.SkipQueueRibbonJob,
      AsyncRibbonProcessing: this.Parameters.AsyncRibbonProcessing,
      ComponentParameters: this.Parameters.ComponentParameters,
      SolutionParameters: enumBody(this.Parameters.SolutionParameters, "SolutionParameters"),
      LayerDesiredOrder: enumBody(this.Parameters.LayerDesiredOrder, "LayerDesiredOrder"),
      SchemaUpdatesOnly: this.Parameters.SchemaUpdatesOnly,
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

  async parseResponse(response: Response): Promise<StageAndUpgradeAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return StageAndUpgradeAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the StageAndUpgradeAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface StageAndUpgradeAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
  ImportJobKey: string;
}

/**
 * StageAndUpgradeAsync response message
 *
 * `result` is the value the StageAndUpgradeAsync action returns (see {@link StageAndUpgradeAsyncResult}).
 */
export class StageAndUpgradeAsyncResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeAsyncResult) {
    super("StageAndUpgradeAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): StageAndUpgradeAsyncResponse {
    return new StageAndUpgradeAsyncResponse(data as StageAndUpgradeAsyncResult);
  }
}
