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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDVCopilotStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
