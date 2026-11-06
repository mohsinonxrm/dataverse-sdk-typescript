import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_GetM365Consent action
 */
export interface msdyn_SalesAgents_GetM365ConsentResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_GetM365ConsentResponse;
  }
}
