import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForDeletedSDKMessageProcessingStepsResponse as msdyn_CheckForDeletedSDKMessageProcessingStepsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForDeletedSDKMessageProcessingStepsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps response message
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedSDKMessageProcessingStepsResponseData) {
    super("msdyn_CheckForDeletedSDKMessageProcessingSteps");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedSDKMessageProcessingStepsResponse {
    return new msdyn_CheckForDeletedSDKMessageProcessingStepsResponse(
      responseObject<msdyn_CheckForDeletedSDKMessageProcessingStepsResponseData>(data)
    );
  }
}
