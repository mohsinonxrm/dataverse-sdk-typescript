import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline request message
 *
 * Web API Action: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public customActionInputs: string
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline");
  }

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
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse.fromResponse(
      data
    );
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      CustomActionInputs: this.customActionInputs,
    };
  }
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline response message
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline");
  }

  static fromResponse(
    data: unknown
  ): msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse {
    return new msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse(
      (data as any).value
    );
  }
}
