import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetCaseResolutionAgentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseResolutionAgentSettingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCaseResolutionAgentSettingsResponse;
  }
}
