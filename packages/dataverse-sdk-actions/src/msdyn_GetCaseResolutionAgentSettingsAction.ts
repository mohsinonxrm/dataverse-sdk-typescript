import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetCaseResolutionAgentSettings action
 */
export interface msdyn_GetCaseResolutionAgentSettingsResponse {
  Result: string;
}

/**
 * msdyn_GetCaseResolutionAgentSettings action
 *
 * Unbound action
 */
export class msdyn_GetCaseResolutionAgentSettingsAction implements Executable<msdyn_GetCaseResolutionAgentSettingsResponse> {
  constructor(public readonly entity?: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseResolutionAgentSettings`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseResolutionAgentSettingsResponse> {
    const data = await response.json();
    return data as msdyn_GetCaseResolutionAgentSettingsResponse;
  }
}
