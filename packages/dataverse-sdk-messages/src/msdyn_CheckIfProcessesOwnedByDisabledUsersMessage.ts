import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfProcessesOwnedByDisabledUsersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfProcessesOwnedByDisabledUsers action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfProcessesOwnedByDisabledUsersResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers response message
 *
 * `result` is the value the msdyn_CheckIfProcessesOwnedByDisabledUsers action returns (see {@link msdyn_CheckIfProcessesOwnedByDisabledUsersResult}).
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfProcessesOwnedByDisabledUsersResult) {
    super("msdyn_CheckIfProcessesOwnedByDisabledUsers");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfProcessesOwnedByDisabledUsersResponse {
    return new msdyn_CheckIfProcessesOwnedByDisabledUsersResponse(
      data as msdyn_CheckIfProcessesOwnedByDisabledUsersResult
    );
  }
}
