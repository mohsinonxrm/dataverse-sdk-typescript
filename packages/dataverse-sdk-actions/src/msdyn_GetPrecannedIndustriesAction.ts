import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetPrecannedIndustries action
 */
export interface msdyn_GetPrecannedIndustriesResponse {
  msdyn_errormessage: string;
  msdyn_industries: string;
}

/**
 * msdyn_GetPrecannedIndustries action
 *
 * Unbound action
 */
export class msdyn_GetPrecannedIndustriesAction implements Executable<msdyn_GetPrecannedIndustriesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPrecannedIndustries`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPrecannedIndustriesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetPrecannedIndustriesResponse;
    return (await response.json()) as msdyn_GetPrecannedIndustriesResponse;
  }
}
