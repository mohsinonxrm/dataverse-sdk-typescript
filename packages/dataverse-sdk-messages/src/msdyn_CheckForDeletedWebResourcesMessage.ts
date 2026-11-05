import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForDeletedWebResources request message
 *
 * Web API Action: msdyn_CheckForDeletedWebResources
 */
export class msdyn_CheckForDeletedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedWebResourcesResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string,
    public excludeSolutionIds: string
  ) {
    super("msdyn_CheckForDeletedWebResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedWebResourcesResponse> {
    const data = await response.json();
    return msdyn_CheckForDeletedWebResourcesResponse.fromResponse(data);
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
 * msdyn_CheckForDeletedWebResources response message
 */
export class msdyn_CheckForDeletedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedWebResourcesResponse) {
    super("msdyn_CheckForDeletedWebResources");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedWebResourcesResponse {
    return new msdyn_CheckForDeletedWebResourcesResponse((data as any).value);
  }
}
