import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ReEngageEntity action
 */
export interface msdyn_SalesAgents_ReEngageEntityResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_ReEngageEntity action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ReEngageEntityAction implements Executable<msdyn_SalesAgents_ReEngageEntityResponse> {
  constructor(
    public readonly msdyn_EntityTypeName: string,
    public readonly msdyn_EntityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ReEngageEntity`;

    const body: Record<string, unknown> = {
      msdyn_EntityTypeName: this.msdyn_EntityTypeName,
      msdyn_EntityId: this.msdyn_EntityId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ReEngageEntityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
