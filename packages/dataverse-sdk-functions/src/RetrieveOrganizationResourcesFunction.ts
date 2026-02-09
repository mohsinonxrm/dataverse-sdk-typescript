import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { OrganizationResources } from "./types/index.js";

/**
 * Response from RetrieveOrganizationResources function
 */
export interface RetrieveOrganizationResourcesResponse {
  OrganizationResources: OrganizationResources;
}

/**
 * RetrieveOrganizationResources function
 *
 * Unbound function
 */
export class RetrieveOrganizationResourcesFunction implements Executable<RetrieveOrganizationResourcesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveOrganizationResources`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveOrganizationResourcesResponse> {
    const data = await response.json();
    return data as RetrieveOrganizationResourcesResponse;
  }
}
