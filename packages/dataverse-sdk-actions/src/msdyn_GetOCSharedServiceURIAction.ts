import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOCSharedServiceURI action
 */
export interface msdyn_GetOCSharedServiceURIResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetOCSharedServiceURIResponse;
    return (await response.json()) as msdyn_GetOCSharedServiceURIResponse;
  }
}
