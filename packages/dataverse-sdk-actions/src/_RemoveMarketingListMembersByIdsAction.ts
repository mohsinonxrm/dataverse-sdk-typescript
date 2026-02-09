import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _RemoveMarketingListMembersByIds action
 */
export interface _RemoveMarketingListMembersByIdsResponse {
  // No content returned
}

/**
 * _RemoveMarketingListMembersByIds action
 *
 * Unbound action
 */
export class _RemoveMarketingListMembersByIdsAction implements Executable<_RemoveMarketingListMembersByIdsResponse> {
  constructor(
    public readonly listId: string,
    public readonly memberIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RemoveMarketingListMembersByIds`;

    const body: Record<string, unknown> = {
      ListId: this.listId,
      MemberIds: this.memberIds,
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

  async parseResponse(response: Response): Promise<_RemoveMarketingListMembersByIdsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
