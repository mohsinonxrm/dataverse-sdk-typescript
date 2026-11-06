import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetLicenseInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLicenseInfoResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_GetLicenseInfo action
 *
 * Unbound action
 */
export class msdyn_GetLicenseInfoAction implements Executable<msdyn_GetLicenseInfoResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLicenseInfo`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLicenseInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetLicenseInfoResponse;
  }
}
