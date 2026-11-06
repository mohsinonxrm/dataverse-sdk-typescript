import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckDVCopilotStatus action
 */
export interface msdyn_CheckDVCopilotStatusResponse {
  // No content returned
}

/**
 * msdyn_CheckDVCopilotStatus action
 *
 * Unbound action
 */
export class msdyn_CheckDVCopilotStatusAction implements Executable<msdyn_CheckDVCopilotStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckDVCopilotStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDVCopilotStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckDVCopilotStatusResponse;
  }
}
