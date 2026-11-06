import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action
 *
 * Unbound action
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineAction implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly customActionInputs?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      CustomActionInputs: this.customActionInputs,
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
  ): Promise<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse> {
    const data = await response.json();
    return data as msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse;
  }
}
