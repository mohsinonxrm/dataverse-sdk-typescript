import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QualifyMemberList action
 */
export interface QualifyMemberListResponse {
  // No content returned
}

/**
 * QualifyMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 */
export class QualifyMemberListAction implements Executable<QualifyMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly listMember: Record<string, unknown>[],
    public readonly overrideorRemove: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.QualifyMemberList`;

    const body: Record<string, unknown> = {
      ListMember: this.listMember,
      OverrideorRemove: this.overrideorRemove,
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

  async parseResponse(response: Response): Promise<QualifyMemberListResponse> {
    // No return value (204 No Content)
    return {};
  }
}
