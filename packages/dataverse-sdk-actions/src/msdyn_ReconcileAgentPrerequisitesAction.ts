import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ReconcileAgentPrerequisites action
 */
export interface msdyn_ReconcileAgentPrerequisitesResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ReconcileAgentPrerequisitesResponse;
    return (await response.json()) as msdyn_ReconcileAgentPrerequisitesResponse;
  }
}
