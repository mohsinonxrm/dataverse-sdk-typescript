import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_RevokeSellerM365Consent action
 */
export interface msdyn_SalesAgents_RevokeSellerM365ConsentResponse {
  msdyn_ConnectionName: string;
}

/**
 * msdyn_SalesAgents_RevokeSellerM365Consent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_RevokeSellerM365ConsentAction implements Executable<msdyn_SalesAgents_RevokeSellerM365ConsentResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_RevokeSellerM365Consent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_RevokeSellerM365ConsentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_RevokeSellerM365ConsentResponse;
    return (await response.json()) as msdyn_SalesAgents_RevokeSellerM365ConsentResponse;
  }
}
