import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForDeletedSDKMessageProcessingSteps message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedSDKMessageProcessingStepsRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps request message
 *
 * Web API Action: msdyn_CheckForDeletedSDKMessageProcessingSteps
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDeletedSDKMessageProcessingStepsRequestParameters>;

  constructor(parameters: msdyn_CheckForDeletedSDKMessageProcessingStepsRequestParameters = {}) {
    super("msdyn_CheckForDeletedSDKMessageProcessingSteps", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedSDKMessageProcessingSteps`;

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
  ): Promise<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForDeletedSDKMessageProcessingStepsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckForDeletedSDKMessageProcessingSteps action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForDeletedSDKMessageProcessingStepsResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps response message
 *
 * `result` is the value the msdyn_CheckForDeletedSDKMessageProcessingSteps action returns (see {@link msdyn_CheckForDeletedSDKMessageProcessingStepsResult}).
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedSDKMessageProcessingStepsResult) {
    super("msdyn_CheckForDeletedSDKMessageProcessingSteps");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForDeletedSDKMessageProcessingStepsResponse {
    return new msdyn_CheckForDeletedSDKMessageProcessingStepsResponse(
      data as msdyn_CheckForDeletedSDKMessageProcessingStepsResult
    );
  }
}
