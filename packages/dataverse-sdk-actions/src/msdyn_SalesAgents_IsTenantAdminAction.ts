import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesAgents_IsTenantAdmin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsTenantAdminResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_IsTenantAdminResponse;
  }
}
