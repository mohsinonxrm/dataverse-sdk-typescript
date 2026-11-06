import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DeleteFlow action
 */
export interface msdyn_DeleteFlowResponse {
  // No content returned
}

/**
 * msdyn_DeleteFlow action
 *
 * Unbound action
 */
export class msdyn_DeleteFlowAction implements Executable<msdyn_DeleteFlowResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeleteFlowResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_DeleteFlowResponse;
  }
}
