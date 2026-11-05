import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCopilotSettingsData action
 */
export interface msdyn_GetCopilotSettingsDataResponse {
  msdyn_output: string;
}

/**
 * msdyn_GetCopilotSettingsData action
 *
 * Unbound action
 */
export class msdyn_GetCopilotSettingsDataAction implements Executable<msdyn_GetCopilotSettingsDataResponse> {
  constructor(public readonly msdyn_input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotSettingsData`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
    };

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
    const data = await response.json();
    return data as msdyn_GetCopilotSettingsDataResponse;
  }
}
