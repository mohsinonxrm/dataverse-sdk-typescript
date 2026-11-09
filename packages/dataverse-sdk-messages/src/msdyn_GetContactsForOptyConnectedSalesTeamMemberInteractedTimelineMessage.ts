import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline request message
 *
 * Web API Action: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequestParameters>;

  constructor(
    parameters: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequestParameters
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordId: this.Parameters.RecordId,
      CustomActionInputs: this.Parameters.CustomActionInputs,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResult {
  "@odata.context"?: string;
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline response message
 *
 * `result` is the value the msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline action returns (see {@link msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResult}).
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResult
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse {
    return new msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse(
      data as msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResult
    );
  }
}
