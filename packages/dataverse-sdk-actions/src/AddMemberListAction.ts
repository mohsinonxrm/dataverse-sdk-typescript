import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddMemberList action
 */
export interface AddMemberListResponse {
  Id: string;
}

/**
 * AddMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 */
export class AddMemberListAction implements Executable<AddMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly entityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.AddMemberList`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddMemberListResponse> {
    const data = await response.json();
    return data as AddMemberListResponse;
  }
}
