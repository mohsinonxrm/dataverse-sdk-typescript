import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfProcessesOwnedByDisabledUsersResponse as msdyn_CheckIfProcessesOwnedByDisabledUsersResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers request message
 *
 * Web API Action: msdyn_CheckIfProcessesOwnedByDisabledUsers
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckIfProcessesOwnedByDisabledUsers");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesOwnedByDisabledUsers`;

    const body: Record<string, unknown> = {
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
  ): Promise<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
    const data = await response.json();
    return msdyn_CheckIfProcessesOwnedByDisabledUsersResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers response message
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfProcessesOwnedByDisabledUsersResponseData) {
    super("msdyn_CheckIfProcessesOwnedByDisabledUsers");
  }

  static fromResponse(data: unknown): msdyn_CheckIfProcessesOwnedByDisabledUsersResponse {
    return new msdyn_CheckIfProcessesOwnedByDisabledUsersResponse(
      responseObject<msdyn_CheckIfProcessesOwnedByDisabledUsersResponseData>(data)
    );
  }
}
