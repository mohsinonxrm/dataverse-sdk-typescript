import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * RetrieveAllChildUsersSystemUser request message
 *
 * Web API Function: RetrieveAllChildUsersSystemUser
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveAllChildUsersSystemUserRequest
  extends OrganizationRequest
  implements Executable<RetrieveAllChildUsersSystemUserResponse>
{
  constructor(public systemuserId: string) {
    super("RetrieveAllChildUsersSystemUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveAllChildUsersSystemUser`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAllChildUsersSystemUserResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveAllChildUsersSystemUserResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveAllChildUsersSystemUserResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAllChildUsersSystemUser function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAllChildUsersSystemUserResult = Array<
  systemuser & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveAllChildUsersSystemUser response message
 *
 * `result` is the value the RetrieveAllChildUsersSystemUser function returns (see {@link RetrieveAllChildUsersSystemUserResult}).
 */
export class RetrieveAllChildUsersSystemUserResponse extends OrganizationResponse {
  constructor(public result: RetrieveAllChildUsersSystemUserResult) {
    super("RetrieveAllChildUsersSystemUser");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAllChildUsersSystemUserResponse {
    return new RetrieveAllChildUsersSystemUserResponse(
      data === undefined ? [] : (data as { value: RetrieveAllChildUsersSystemUserResult }).value
    );
  }
}
