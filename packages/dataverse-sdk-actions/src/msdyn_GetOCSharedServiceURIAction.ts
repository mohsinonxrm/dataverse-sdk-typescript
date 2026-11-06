import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetOCSharedServiceURI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOCSharedServiceURIResponse {
  "@odata.context"?: string;
  SharedServiceURI: string;
}

/**
 * msdyn_GetOCSharedServiceURI action
 *
 * Unbound action
 */
export class msdyn_GetOCSharedServiceURIAction implements Executable<msdyn_GetOCSharedServiceURIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOCSharedServiceURI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOCSharedServiceURIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOCSharedServiceURIResponse;
  }
}
