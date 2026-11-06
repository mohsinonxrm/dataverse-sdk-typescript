import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationInfo } from "./types/index.js";

/**
 * Response from RetrieveOrganizationInfo function
 */
export interface RetrieveOrganizationInfoResponse {
  organizationInfo: OrganizationInfo;
}

/**
 * RetrieveOrganizationInfo function
 *
 * Unbound function
 */
export class RetrieveOrganizationInfoFunction implements Executable<RetrieveOrganizationInfoResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationInfo`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationInfoResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveOrganizationInfoResponse;
  }
}
