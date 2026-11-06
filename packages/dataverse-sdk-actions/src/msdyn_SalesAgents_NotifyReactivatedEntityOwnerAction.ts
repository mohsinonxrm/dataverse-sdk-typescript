import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_NotifyReactivatedEntityOwner action
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesAgents_NotifyReactivatedEntityOwner action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerActionParameters {
  msdyn_EntityTypeName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerAction implements Executable<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_NotifyReactivatedEntityOwnerActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_NotifyReactivatedEntityOwner`;

    const body = requestBody({
      msdyn_EntityTypeName: this.parameters.msdyn_EntityTypeName,
      msdyn_EntityId: this.parameters.msdyn_EntityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse;
    return (await response.json()) as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse;
  }
}
