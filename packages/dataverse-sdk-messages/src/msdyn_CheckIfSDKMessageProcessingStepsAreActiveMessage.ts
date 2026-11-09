import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfSDKMessageProcessingStepsAreActive message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive request message
 *
 * Web API Action: msdyn_CheckIfSDKMessageProcessingStepsAreActive
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequestParameters>;

  constructor(parameters: msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequestParameters = {}) {
    super("msdyn_CheckIfSDKMessageProcessingStepsAreActive", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSDKMessageProcessingStepsAreActive`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfSDKMessageProcessingStepsAreActive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive response message
 *
 * `result` is the value the msdyn_CheckIfSDKMessageProcessingStepsAreActive action returns (see {@link msdyn_CheckIfSDKMessageProcessingStepsAreActiveResult}).
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSDKMessageProcessingStepsAreActiveResult) {
    super("msdyn_CheckIfSDKMessageProcessingStepsAreActive");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
    return new msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse(
      data as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResult
    );
  }
}
