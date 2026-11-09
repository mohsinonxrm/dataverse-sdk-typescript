import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetContactsForOptyConnectedSalesTeamMember action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberResult {
  "@odata.context"?: string;
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember response message
 *
 * `result` is the value the msdyn_GetContactsForOptyConnectedSalesTeamMember action returns (see {@link msdyn_GetContactsForOptyConnectedSalesTeamMemberResult}).
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsForOptyConnectedSalesTeamMemberResult) {
    super("msdyn_GetContactsForOptyConnectedSalesTeamMember");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse {
    return new msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse(
      data as msdyn_GetContactsForOptyConnectedSalesTeamMemberResult
    );
  }
}
