import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForCustomizedOptionSetResponse as msdyn_CheckForCustomizedOptionSetResponseData } from "./types/index.js";

/**
 * msdyn_CheckForCustomizedOptionSet request message
 *
 * Web API Action: msdyn_CheckForCustomizedOptionSet
 */
export class msdyn_CheckForCustomizedOptionSetRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedOptionSetResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string,
    public excludeSolutionIds: string
  ) {
    super("msdyn_CheckForCustomizedOptionSet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedOptionSet`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedOptionSetResponse> {
    const data = await response.json();
    return msdyn_CheckForCustomizedOptionSetResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForCustomizedOptionSet response message
 */
export class msdyn_CheckForCustomizedOptionSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedOptionSetResponseData) {
    super("msdyn_CheckForCustomizedOptionSet");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedOptionSetResponse {
    return new msdyn_CheckForCustomizedOptionSetResponse(
      responseObject<msdyn_CheckForCustomizedOptionSetResponseData>(data)
    );
  }
}
