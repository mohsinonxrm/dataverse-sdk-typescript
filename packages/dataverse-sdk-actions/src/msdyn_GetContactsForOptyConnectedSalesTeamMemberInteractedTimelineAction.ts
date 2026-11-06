import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * Parameters of the msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action
 *
 * Unbound action
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineAction implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse> {
  constructor(
    public readonly parameters: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
      CustomActionInputs: this.parameters.CustomActionInputs,
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
  ): Promise<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse;
    return (await response.json()) as msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse;
  }
}
