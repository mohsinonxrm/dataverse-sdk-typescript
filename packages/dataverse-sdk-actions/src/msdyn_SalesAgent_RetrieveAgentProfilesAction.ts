import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgent_RetrieveAgentProfiles action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_RetrieveAgentProfilesResponse {
  "@odata.context"?: string;
  Message: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgent_RetrieveAgentProfiles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_RetrieveAgentProfilesActionParameters {
  FeatureName?: string;
}

/**
 * msdyn_SalesAgent_RetrieveAgentProfiles action
 *
 * Unbound action
 */
export class msdyn_SalesAgent_RetrieveAgentProfilesAction implements Executable<msdyn_SalesAgent_RetrieveAgentProfilesResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgent_RetrieveAgentProfilesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_RetrieveAgentProfiles`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_RetrieveAgentProfilesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgent_RetrieveAgentProfilesResponse;
  }
}
