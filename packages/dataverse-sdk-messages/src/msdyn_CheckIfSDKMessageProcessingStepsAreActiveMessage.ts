import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse.fromResponse({});
    return msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive response message
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponseData) {
    super("msdyn_CheckIfSDKMessageProcessingStepsAreActive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
    return new msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse(
      responseObject<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponseData>(data)
    );
  }
}
