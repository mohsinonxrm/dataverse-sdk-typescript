import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_NotifyReactivatedEntityOwner action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse;
  }
}
