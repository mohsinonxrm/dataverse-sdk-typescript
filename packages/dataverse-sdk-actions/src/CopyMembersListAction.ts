import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from CopyMembersList action
 */
export interface CopyMembersListResponse {
  // No content returned
}

/**
 * CopyMembersList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 */
export class CopyMembersListAction implements Executable<CopyMembersListResponse> {
  constructor(
    public readonly listId: string,
    public readonly targetList: list
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyMembersList`;

    const body: Record<string, unknown> = {
      TargetList: this.targetList,
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

  async parseResponse(response: Response): Promise<CopyMembersListResponse> {
    // No return value (204 No Content)
    return {};
  }
}
