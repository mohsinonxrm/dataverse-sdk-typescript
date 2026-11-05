import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive request message
 *
 * Web API Action: msdyn_CheckIfSLAOwnerIsActiveOrInactive
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string,
    public excludeSolutionIds: string
  ) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAOwnerIsActiveOrInactive`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
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
  ): Promise<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse> {
    const data = await response.json();
    return msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
    };
  }
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive response message
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse {
    return new msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse((data as any).value);
  }
}
