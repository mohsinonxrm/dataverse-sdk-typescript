import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsSSSEnabled action
 */
export interface msdyn_IsSSSEnabledResponse {
  IsSSSEnabled: boolean;
}

/**
 * msdyn_IsSSSEnabled action
 *
 * Unbound action
 */
export class msdyn_IsSSSEnabledAction implements Executable<msdyn_IsSSSEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSSSEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IsSSSEnabledResponse;
  }
}
