import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { privilege } from "./types/index.js";

/**
 * Response from RetrievePrivilegeSet function
 */
export interface RetrievePrivilegeSetResponse {
  value: privilege[];
}

/**
 * RetrievePrivilegeSet function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.privilege))
 */
export class RetrievePrivilegeSetFunction implements Executable<RetrievePrivilegeSetResponse> {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrievePrivilegeSetResponse;
  }
}
