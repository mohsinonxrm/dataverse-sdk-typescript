import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_IsTenantAdmin action
 */
export interface msdyn_SalesAgents_IsTenantAdminResponse {
  IsTenantAdmin: boolean;
}

/**
 * msdyn_SalesAgents_IsTenantAdmin action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_IsTenantAdminAction implements Executable<msdyn_SalesAgents_IsTenantAdminResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsTenantAdmin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_IsTenantAdminResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_IsTenantAdminResponse;
  }
}
