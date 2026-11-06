import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_GetSuggestedContacts action
 */
export interface msdyn_SalesAgents_GetSuggestedContactsResponse {
  msdyn_Contacts: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetSuggestedContacts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSuggestedContactsActionParameters {
  msdyn_RegardingId: string;
  msdyn_RegardingEntity: string;
}

/**
 * msdyn_SalesAgents_GetSuggestedContacts action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetSuggestedContactsAction implements Executable<msdyn_SalesAgents_GetSuggestedContactsResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_GetSuggestedContactsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSuggestedContacts`;

    const body = requestBody({
      msdyn_RegardingId: this.parameters.msdyn_RegardingId,
      msdyn_RegardingEntity: this.parameters.msdyn_RegardingEntity,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetSuggestedContactsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_GetSuggestedContactsResponse;
    return (await response.json()) as msdyn_SalesAgents_GetSuggestedContactsResponse;
  }
}
