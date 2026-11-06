import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getIslandUrl action
 */
export interface msdyn_getIslandUrlResponse {
  Result: string;
}

/**
 * msdyn_getIslandUrl action
 *
 * Unbound action
 */
export class msdyn_getIslandUrlAction implements Executable<msdyn_getIslandUrlResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getIslandUrl`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getIslandUrlResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getIslandUrlResponse;
  }
}
