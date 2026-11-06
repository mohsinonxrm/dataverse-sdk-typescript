import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { listmember } from "./types/index.js";

/**
 * Response from RemoveMemberList action
 */
export interface RemoveMemberListResponse {
  // No content returned
}

/**
 * RemoveMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 */
export class RemoveMemberListAction implements Executable<RemoveMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly listMember: EntityReference | EntityPayload<listmember>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.RemoveMemberList`;

    const body: Record<string, unknown> = {
      ListMember: this.listMember,
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

  async parseResponse(response: Response): Promise<RemoveMemberListResponse> {
    // No return value (204 No Content)
    return {};
  }
}
