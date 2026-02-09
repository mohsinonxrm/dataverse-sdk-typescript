import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive request message
 *
 * Web API Action: msdyn_CheckIfSDKMessageProcessingStepsAreActive
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string
  ) {
    super("msdyn_CheckIfSDKMessageProcessingStepsAreActive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSDKMessageProcessingStepsAreActive`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
    const data = await response.json();
    return msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive response message
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse) {
    super("msdyn_CheckIfSDKMessageProcessingStepsAreActive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
    return new msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse((data as any).value);
  }
}
