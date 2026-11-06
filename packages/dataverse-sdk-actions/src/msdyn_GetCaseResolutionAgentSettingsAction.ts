import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetCaseResolutionAgentSettings action
 */
export interface msdyn_GetCaseResolutionAgentSettingsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_GetCaseResolutionAgentSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseResolutionAgentSettingsActionParameters {
  RunId?: string;
  Entity?: EntityReference | AnyEntityPayload;
  SkipEnablementChecks?: boolean;
}

/**
 * msdyn_GetCaseResolutionAgentSettings action
 *
 * Unbound action
 */
export class msdyn_GetCaseResolutionAgentSettingsAction implements Executable<msdyn_GetCaseResolutionAgentSettingsResponse> {
  constructor(
    public readonly parameters: msdyn_GetCaseResolutionAgentSettingsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseResolutionAgentSettings`;

    const body = requestBody({
      RunId: this.parameters.RunId,
      Entity: this.parameters.Entity,
      SkipEnablementChecks: this.parameters.SkipEnablementChecks,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseResolutionAgentSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCaseResolutionAgentSettingsResponse;
    return (await response.json()) as msdyn_GetCaseResolutionAgentSettingsResponse;
  }
}
