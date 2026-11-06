import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfProcessesOwnedByDisabledUsersResponse as msdyn_CheckIfProcessesOwnedByDisabledUsersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfProcessesOwnedByDisabledUsers message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfProcessesOwnedByDisabledUsersRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers request message
 *
 * Web API Action: msdyn_CheckIfProcessesOwnedByDisabledUsers
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfProcessesOwnedByDisabledUsersRequestParameters>;

  constructor(parameters: msdyn_CheckIfProcessesOwnedByDisabledUsersRequestParameters = {}) {
    super("msdyn_CheckIfProcessesOwnedByDisabledUsers", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesOwnedByDisabledUsers`;

    const body = requestBody({
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
  ): Promise<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfProcessesOwnedByDisabledUsersResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
