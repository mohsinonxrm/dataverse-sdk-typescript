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
    const data = await response.json();
    return data as msdyn_SalesAgents_IsTenantAdminResponse;
  }
}
