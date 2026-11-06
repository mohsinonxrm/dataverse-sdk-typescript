import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetContactsForOptyConnectedSalesTeamMember action
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * Parameters of the msdyn_GetContactsForOptyConnectedSalesTeamMember action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember action
 *
 * Unbound action
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberAction implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse> {
  constructor(
    public readonly parameters: msdyn_GetContactsForOptyConnectedSalesTeamMemberActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsForOptyConnectedSalesTeamMember`;

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
  ): Promise<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse;
  }
}
