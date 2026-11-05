import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * RemoveListMembersList request message
 *
 * Web API Action: RemoveListMembersList
 */
export class RemoveListMembersListRequest
  extends OrganizationRequest
  implements Executable<RemoveListMembersListResponse>
{
  constructor(
    public list: list,
    public members: Record<string, unknown>[]
  ) {
    super("RemoveListMembersList");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveListMembersListResponse> {
    // No return value (204 No Content)
    return new RemoveListMembersListResponse();
  }
}

/**
 * RemoveListMembersList response message
 */
export class RemoveListMembersListResponse extends OrganizationResponse {
  constructor() {
    super("RemoveListMembersList");
  }

  static fromResponse(_data: unknown): RemoveListMembersListResponse {
    return new RemoveListMembersListResponse();
  }
}
