import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateCopilotSettings action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateCopilotSettingsResponse = void;

/**
 * Parameters of the msdyn_UpdateCopilotSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateCopilotSettingsActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_UpdateCopilotSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateCopilotSettingsAction implements Executable<msdyn_UpdateCopilotSettingsResponse> {
  constructor(public readonly parameters: msdyn_UpdateCopilotSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCopilotSettings`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<msdyn_UpdateCopilotSettingsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
