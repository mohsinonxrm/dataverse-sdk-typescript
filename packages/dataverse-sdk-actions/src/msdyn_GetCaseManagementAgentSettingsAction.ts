import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetCaseManagementAgentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseManagementAgentSettingsResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GetCaseManagementAgentSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseManagementAgentSettingsActionParameters {
  RefreshIntentFamily?: boolean;
  Entity: EntityReference | AnyEntityPayload;
  Actions?: string;
  RunId?: string;
}

/**
 * msdyn_GetCaseManagementAgentSettings action
 *
 * Unbound action
 */
export class msdyn_GetCaseManagementAgentSettingsAction implements Executable<msdyn_GetCaseManagementAgentSettingsResponse> {
  constructor(public readonly parameters: msdyn_GetCaseManagementAgentSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseManagementAgentSettings`;

    const body = requestBody({
      RefreshIntentFamily: this.parameters.RefreshIntentFamily,
      Entity: this.parameters.Entity,
      Actions: this.parameters.Actions,
      RunId: this.parameters.RunId,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseManagementAgentSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCaseManagementAgentSettingsResponse;
  }
}
