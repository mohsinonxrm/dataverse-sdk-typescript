import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsActionParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action
 *
 * Unbound action
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsAction implements Executable<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
  constructor(
    public readonly parameters: msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllSuggestedActionCardsForPrioritizedLeads`;

    const body = requestBody({
      ClientContext: this.parameters.ClientContext,
      OtherData: this.parameters.OtherData,
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
  ): Promise<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse;
    return (await response.json()) as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse;
  }
}
