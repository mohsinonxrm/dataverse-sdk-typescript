import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from RemoveListMembersList action
 */
export interface RemoveListMembersListResponse {
  // No content returned
}

/**
 * RemoveListMembersList action
 *
 * Unbound action
 */
export class RemoveListMembersListAction implements Executable<RemoveListMembersListResponse> {
  constructor(
    public readonly list: list,
    public readonly members: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveListMembersList`;

    const body: Record<string, unknown> = {
      List: this.list,
      Members: this.members,
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

  async parseResponse(response: Response): Promise<RemoveListMembersListResponse> {
    // No return value (204 No Content)
    return {};
  }
}
