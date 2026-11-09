import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ReconcileAgentPrerequisites action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ReconcileAgentPrerequisitesResponse {
  "@odata.context"?: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_ReconcileAgentPrerequisites action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ReconcileAgentPrerequisitesActionParameters {
  FeatureName: string;
  ProfileId?: string;
}

/**
 * msdyn_ReconcileAgentPrerequisites action
 *
 * Unbound action
 */
export class msdyn_ReconcileAgentPrerequisitesAction implements Executable<msdyn_ReconcileAgentPrerequisitesResponse> {
  constructor(public readonly parameters: msdyn_ReconcileAgentPrerequisitesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ReconcileAgentPrerequisites`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      ProfileId: this.parameters.ProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_ReconcileAgentPrerequisitesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ReconcileAgentPrerequisitesResponse;
  }
}
