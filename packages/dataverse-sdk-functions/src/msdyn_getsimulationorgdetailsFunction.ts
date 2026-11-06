import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_getsimulationorgdetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getsimulationorgdetailsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getsimulationorgdetailsResponse;
  }
}
