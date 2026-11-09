import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckAnyUserIsIntegrationUser request message
 *
 * Web API Action: msdyn_CheckAnyUserIsIntegrationUser
 */
export class msdyn_CheckAnyUserIsIntegrationUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckAnyUserIsIntegrationUserResponse>
{
  constructor() {
    super("msdyn_CheckAnyUserIsIntegrationUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAnyUserIsIntegrationUser`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAnyUserIsIntegrationUserResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckAnyUserIsIntegrationUserResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckAnyUserIsIntegrationUser action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckAnyUserIsIntegrationUserResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckAnyUserIsIntegrationUser response message
 *
 * `result` is the value the msdyn_CheckAnyUserIsIntegrationUser action returns (see {@link msdyn_CheckAnyUserIsIntegrationUserResult}).
 */
export class msdyn_CheckAnyUserIsIntegrationUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckAnyUserIsIntegrationUserResult) {
    super("msdyn_CheckAnyUserIsIntegrationUser");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckAnyUserIsIntegrationUserResponse {
    return new msdyn_CheckAnyUserIsIntegrationUserResponse(
      data as msdyn_CheckAnyUserIsIntegrationUserResult
    );
  }
}
