import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetUserConsentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetUserConsentStatusResponse {
  "@odata.context"?: string;
  status: string;
}

/**
 * msdyn_GetUserConsentStatus action
 *
 * Unbound action
 */
export class msdyn_GetUserConsentStatusAction implements Executable<msdyn_GetUserConsentStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetUserConsentStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetUserConsentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetUserConsentStatusResponse;
  }
}
