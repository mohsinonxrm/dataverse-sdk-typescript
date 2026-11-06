import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse as msdyn_GetContactsForOptyConnectedSalesTeamMemberResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetContactsForOptyConnectedSalesTeamMember message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember request message
 *
 * Web API Action: msdyn_GetContactsForOptyConnectedSalesTeamMember
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetContactsForOptyConnectedSalesTeamMemberRequestParameters>;

  constructor(parameters: msdyn_GetContactsForOptyConnectedSalesTeamMemberRequestParameters) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMember", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMember`;

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
  ): Promise<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse.fromResponse({});
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse.fromResponse(
      await response.json()
    );
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
