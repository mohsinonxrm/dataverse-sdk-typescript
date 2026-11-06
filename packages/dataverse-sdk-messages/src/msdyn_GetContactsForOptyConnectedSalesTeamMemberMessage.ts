import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse as msdyn_GetContactsForOptyConnectedSalesTeamMemberResponseData } from "./types/index.js";

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember request message
 *
 * Web API Action: msdyn_GetContactsForOptyConnectedSalesTeamMember
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public customActionInputs: string
  ) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMember");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMember`;

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
  ): Promise<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse> {
    const data = await response.json();
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember response message
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsForOptyConnectedSalesTeamMemberResponseData) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMember");
  }

  static fromResponse(data: unknown): msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse {
    return new msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse(
      responseObject<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponseData>(data)
    );
  }
}
