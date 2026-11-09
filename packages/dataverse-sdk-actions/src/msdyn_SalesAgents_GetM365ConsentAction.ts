import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesAgents_GetM365Consent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetM365ConsentResponse {
  "@odata.context"?: string;
  msdyn_IsTeamsConsentGranted: boolean;
  msdyn_IsTenantConsentGranted: boolean;
  msdyn_SellerConsentStatus: string;
}

/**
 * msdyn_SalesAgents_GetM365Consent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetM365ConsentAction implements Executable<msdyn_SalesAgents_GetM365ConsentResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetM365Consent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetM365ConsentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_GetM365ConsentResponse;
  }
}
