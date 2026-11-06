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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckDVCopilotStatusResponse;
    return (await response.json()) as msdyn_CheckDVCopilotStatusResponse;
  }
}
