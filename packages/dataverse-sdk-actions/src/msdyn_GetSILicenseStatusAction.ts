import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetSILicenseStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSILicenseStatusResponse {
  "@odata.context"?: string;
  SILicenseStatus: string;
}

/**
 * msdyn_GetSILicenseStatus action
 *
 * Unbound action
 */
export class msdyn_GetSILicenseStatusAction implements Executable<msdyn_GetSILicenseStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSILicenseStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSILicenseStatusResponse;
  }
}
