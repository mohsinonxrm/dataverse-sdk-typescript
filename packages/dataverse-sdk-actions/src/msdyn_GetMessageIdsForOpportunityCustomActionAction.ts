import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetMessageIdsForOpportunityCustomAction action
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionResponse {
  MessageIds: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction action
 *
 * Unbound action
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionAction implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
  constructor(public readonly opportunityId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageIdsForOpportunityCustomAction`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
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
  ): Promise<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_GetMessageIdsForOpportunityCustomActionResponse;
  }
}
