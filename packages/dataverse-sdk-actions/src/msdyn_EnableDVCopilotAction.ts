import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_EnableDVCopilot action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_EnableDVCopilotResponse = void;

/**
 * msdyn_EnableDVCopilot action
 *
 * Unbound action
 */
export class msdyn_EnableDVCopilotAction implements Executable<msdyn_EnableDVCopilotResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableDVCopilot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_EnableDVCopilotResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
