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
    let url = `${baseUrl}/RetrievePrivilegeSet`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePrivilegeSetResponse> {
    const data = await response.json();
    return data as RetrievePrivilegeSetResponse;
  }
}
