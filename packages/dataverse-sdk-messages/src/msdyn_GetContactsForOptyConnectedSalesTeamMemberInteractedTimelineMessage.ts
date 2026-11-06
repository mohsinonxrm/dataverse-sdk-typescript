import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse as msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline response message
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponseData
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimeline");
  }

  static fromResponse(
    data: unknown
  ): msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse {
    return new msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse(
      responseObject<msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponseData>(
        data
      )
    );
  }
}
