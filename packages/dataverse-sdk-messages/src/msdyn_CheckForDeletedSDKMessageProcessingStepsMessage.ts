import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public entityIds: string,
    public solutionId: string
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

  toRequestBody(): Record<string, unknown> {
    return {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps response message
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedSDKMessageProcessingStepsResponse) {
    super("msdyn_CheckForDeletedSDKMessageProcessingSteps");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedSDKMessageProcessingStepsResponse {
    return new msdyn_CheckForDeletedSDKMessageProcessingStepsResponse((data as any).value);
  }
}
