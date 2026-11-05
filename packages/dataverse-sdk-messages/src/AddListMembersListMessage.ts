import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * AddListMembersList request message
 *
 * Web API Action: AddListMembersList
 */
export class AddListMembersListRequest
  extends OrganizationRequest
  implements Executable<AddListMembersListResponse>
{
  constructor(
    public list: list,
    public members: Record<string, unknown>[]
  ) {
    super("AddListMembersList");
  }

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
    return new AddListMembersListResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      List: this.list,
      Members: this.members,
    };
  }
}

/**
 * AddListMembersList response message
 */
export class AddListMembersListResponse extends OrganizationResponse {
  constructor() {
    super("AddListMembersList");
  }

  static fromResponse(_data: unknown): AddListMembersListResponse {
    return new AddListMembersListResponse();
  }
}
