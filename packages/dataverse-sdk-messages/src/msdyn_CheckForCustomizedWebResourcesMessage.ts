import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForCustomizedWebResourcesResponse as msdyn_CheckForCustomizedWebResourcesResponseData } from "./types/index.js";

/**
 * msdyn_CheckForCustomizedWebResources request message
 *
 * Web API Action: msdyn_CheckForCustomizedWebResources
 */
export class msdyn_CheckForCustomizedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedWebResourcesResponse>
{
  constructor(
    public entityIds?: string,
    public solutionId?: string,
    public excludeSolutionIds?: string
  ) {
    super("msdyn_CheckForCustomizedWebResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedWebResourcesResponse> {
    const data = await response.json();
    return msdyn_CheckForCustomizedWebResourcesResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForCustomizedWebResources response message
 */
export class msdyn_CheckForCustomizedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedWebResourcesResponseData) {
    super("msdyn_CheckForCustomizedWebResources");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedWebResourcesResponse {
    return new msdyn_CheckForCustomizedWebResourcesResponse(
      responseObject<msdyn_CheckForCustomizedWebResourcesResponseData>(data)
    );
  }
}
