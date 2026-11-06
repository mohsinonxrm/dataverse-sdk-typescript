import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetPrecannedIndustries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPrecannedIndustriesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetPrecannedIndustriesResponse;
  }
}
