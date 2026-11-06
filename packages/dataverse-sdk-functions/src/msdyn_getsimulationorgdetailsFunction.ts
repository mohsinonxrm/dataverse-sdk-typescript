import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getsimulationorgdetails function
 */
export interface msdyn_getsimulationorgdetailsResponse {
  ClusterCategory: string;
  Geo: string;
  OrganizationType: string;
  PowerPlatformApiBaseUrl: string;
}

/**
 * msdyn_getsimulationorgdetails function
 *
 * Unbound function
 */
export class msdyn_getsimulationorgdetailsFunction implements Executable<msdyn_getsimulationorgdetailsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getsimulationorgdetails`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getsimulationorgdetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_getsimulationorgdetailsResponse;
    return (await response.json()) as msdyn_getsimulationorgdetailsResponse;
  }
}
