import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse;
  }
}
