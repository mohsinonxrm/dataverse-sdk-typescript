import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_GetRefreshFrequency action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyResponse {
  "@odata.context"?: string;
  IsRefreshEnabled: boolean;
  RefreshFrequencyInDays: number;
}

/**
 * Parameters of the msdyn_SalesAgents_GetRefreshFrequency action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyActionParameters {
  ProfileId: string;
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetRefreshFrequencyAction implements Executable<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_GetRefreshFrequencyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetRefreshFrequency`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_GetRefreshFrequencyResponse;
  }
}
