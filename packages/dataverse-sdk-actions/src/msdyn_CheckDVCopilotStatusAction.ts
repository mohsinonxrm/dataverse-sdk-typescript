import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckDVCopilotStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CheckDVCopilotStatusResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CheckDVCopilotStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
