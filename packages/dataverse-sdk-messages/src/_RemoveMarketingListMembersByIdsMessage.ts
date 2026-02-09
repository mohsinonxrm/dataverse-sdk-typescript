import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _RemoveMarketingListMembersByIds request message
 *
 * Web API Action: _RemoveMarketingListMembersByIds
 */
export class _RemoveMarketingListMembersByIdsRequest
  extends OrganizationRequest
  implements Executable<_RemoveMarketingListMembersByIdsResponse>
{
  constructor(
    public listId: string,
    public memberIds: string
  ) {
    super("_RemoveMarketingListMembersByIds");
  }

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
    return new _RemoveMarketingListMembersByIdsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ListId: this.listId,
      MemberIds: this.memberIds,
    };
  }
}

/**
 * _RemoveMarketingListMembersByIds response message
 */
export class _RemoveMarketingListMembersByIdsResponse extends OrganizationResponse {
  constructor() {
    super("_RemoveMarketingListMembersByIds");
  }

  static fromResponse(_data: unknown): _RemoveMarketingListMembersByIdsResponse {
    return new _RemoveMarketingListMembersByIdsResponse();
  }
}
