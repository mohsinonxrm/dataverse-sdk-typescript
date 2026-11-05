import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_NotifyReactivatedEntityOwner action
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse {
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerAction implements Executable<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
  constructor(
    public readonly msdyn_EntityTypeName: string,
    public readonly msdyn_EntityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_NotifyReactivatedEntityOwner`;

    const body: Record<string, unknown> = {
      msdyn_EntityTypeName: this.msdyn_EntityTypeName,
      msdyn_EntityId: this.msdyn_EntityId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse;
  }
}
