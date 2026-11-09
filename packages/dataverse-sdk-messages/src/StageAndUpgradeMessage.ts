import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Parameters of the StageAndUpgrade message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageAndUpgradeRequestParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile: string;
  ImportJobId: string;
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
 * StageAndUpgrade request message
 *
 * Web API Action: StageAndUpgrade
 */
export class StageAndUpgradeRequest
  extends OrganizationRequest
  implements Executable<StageAndUpgradeResponse>
{
  declare readonly Parameters: Readonly<StageAndUpgradeRequestParameters>;

  constructor(parameters: StageAndUpgradeRequestParameters) {
    super("StageAndUpgrade", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgrade`;

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

  async parseResponse(response: Response): Promise<StageAndUpgradeResponse> {
    // The body is the complex value, with its @odata.context
    return StageAndUpgradeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the StageAndUpgrade action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface StageAndUpgradeResult {
  "@odata.context"?: string;
  SolutionId: string;
}

/**
 * StageAndUpgrade response message
 *
 * `result` is the value the StageAndUpgrade action returns (see {@link StageAndUpgradeResult}).
 */
export class StageAndUpgradeResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeResult) {
    super("StageAndUpgrade");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): StageAndUpgradeResponse {
    return new StageAndUpgradeResponse(data as StageAndUpgradeResult);
  }
}
