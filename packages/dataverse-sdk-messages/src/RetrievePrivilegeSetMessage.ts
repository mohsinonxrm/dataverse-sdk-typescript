import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { privilege } from "./types/index.js";

/**
 * RetrievePrivilegeSet request message
 *
 * Web API Function: RetrievePrivilegeSet
 */
export class RetrievePrivilegeSetRequest
  extends OrganizationRequest
  implements Executable<RetrievePrivilegeSetResponse>
{
  constructor() {
    super("RetrievePrivilegeSet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePrivilegeSetResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrievePrivilegeSetResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrievePrivilegeSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePrivilegeSet function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrievePrivilegeSetResult = Array<
  privilege & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrievePrivilegeSet response message
 *
 * `result` is the value the RetrievePrivilegeSet function returns (see {@link RetrievePrivilegeSetResult}).
 */
export class RetrievePrivilegeSetResponse extends OrganizationResponse {
  constructor(public result: RetrievePrivilegeSetResult) {
    super("RetrievePrivilegeSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrivilegeSetResponse {
    return new RetrievePrivilegeSetResponse(
      data === undefined ? [] : (data as { value: RetrievePrivilegeSetResult }).value
    );
  }
}
