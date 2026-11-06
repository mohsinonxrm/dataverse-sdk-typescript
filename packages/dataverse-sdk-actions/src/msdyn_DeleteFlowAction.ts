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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DeleteFlowResponse;
    return (await response.json()) as msdyn_DeleteFlowResponse;
  }
}
