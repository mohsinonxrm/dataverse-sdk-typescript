import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * Response from AddListMembersList action
 */
export interface AddListMembersListResponse {
  // No content returned
}

/**
 * AddListMembersList action
 *
 * Unbound action
 */
export class AddListMembersListAction implements Executable<AddListMembersListResponse> {
  constructor(
    public readonly list: list,
    public readonly members: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddListMembersList`;

    const body: Record<string, unknown> = {
      List: this.list,
      Members: this.members,
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

  async parseResponse(response: Response): Promise<AddListMembersListResponse> {
    // No return value (204 No Content)
    return {};
  }
}
