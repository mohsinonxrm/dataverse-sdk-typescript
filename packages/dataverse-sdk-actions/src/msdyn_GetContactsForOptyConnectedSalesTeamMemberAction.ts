import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetContactsForOptyConnectedSalesTeamMember action
 */
export interface msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsForOptyConnectedSalesTeamMember action
 *
 * Unbound action
 */
export class msdyn_GetContactsForOptyConnectedSalesTeamMemberAction implements Executable<msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly customActionInputs?: string
  ) {}

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
    return data as msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse;
  }
}
