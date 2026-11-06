import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForDeletedSDKMessageProcessingStepsResponse as msdyn_CheckForDeletedSDKMessageProcessingStepsResponseData } from "./types/index.js";

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps request message
 *
 * Web API Action: msdyn_CheckForDeletedSDKMessageProcessingSteps
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse>
{
  constructor(
    public entityIds?: string,
    public solutionId?: string
  ) {
    super("msdyn_CheckForDeletedSDKMessageProcessingSteps");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedSDKMessageProcessingSteps`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
    const data = await response.json();
    return msdyn_CheckForDeletedSDKMessageProcessingStepsResponse.fromResponse(data);
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
