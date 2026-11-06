import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  LayerDesiredOrder,
  SolutionParameters,
  StageAndUpgradeResponse as StageAndUpgradeResponseData,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return StageAndUpgradeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * StageAndUpgrade response message
 */
export class StageAndUpgradeResponse extends OrganizationResponse {
  constructor(public result: StageAndUpgradeResponseData) {
    super("StageAndUpgrade");
  }

  static fromResponse(data: unknown): StageAndUpgradeResponse {
    return new StageAndUpgradeResponse(responseObject<StageAndUpgradeResponseData>(data));
  }
}
