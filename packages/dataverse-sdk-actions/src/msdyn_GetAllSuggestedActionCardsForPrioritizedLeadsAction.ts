import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse {
  Result: string;
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action
 *
 * Unbound action
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsAction implements Executable<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
  constructor(
    public readonly clientContext?: string,
    public readonly otherData?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllSuggestedActionCardsForPrioritizedLeads`;

    const body: Record<string, unknown> = {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
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
  ): Promise<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
    const data = await response.json();
    return data as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse;
  }
}
