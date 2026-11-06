import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getAppConfig action
 */
export interface msdyn_getAppConfigResponse {
  // No content returned
}

/**
 * msdyn_getAppConfig action
 *
 * Unbound action
 */
export class msdyn_getAppConfigAction implements Executable<msdyn_getAppConfigResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getAppConfigResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getAppConfigResponse;
  }
}
