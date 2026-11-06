import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ReEngageEntity action
 */
export interface msdyn_SalesAgents_ReEngageEntityResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesAgents_ReEngageEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ReEngageEntityActionParameters {
  msdyn_EntityTypeName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_SalesAgents_ReEngageEntity action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ReEngageEntityAction implements Executable<msdyn_SalesAgents_ReEngageEntityResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_ReEngageEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ReEngageEntity`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ReEngageEntityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_ReEngageEntityResponse;
  }
}
