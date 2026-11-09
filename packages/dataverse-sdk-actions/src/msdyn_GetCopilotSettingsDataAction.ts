import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCopilotSettingsData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCopilotSettingsDataResponse {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * Parameters of the msdyn_GetCopilotSettingsData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotSettingsDataActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetCopilotSettingsData action
 *
 * Unbound action
 */
export class msdyn_GetCopilotSettingsDataAction implements Executable<msdyn_GetCopilotSettingsDataResponse> {
  constructor(public readonly parameters: msdyn_GetCopilotSettingsDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotSettingsData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCopilotSettingsDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCopilotSettingsDataResponse;
  }
}
