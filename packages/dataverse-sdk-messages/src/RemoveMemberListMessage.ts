import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { listmember } from "./types/index.js";

/**
 * RemoveMemberList request message
 *
 * Web API Action: RemoveMemberList
 */
export class RemoveMemberListRequest
  extends OrganizationRequest
  implements Executable<RemoveMemberListResponse>
{
  constructor(
    public listId: string,
    public listMember: listmember
  ) {
    super("RemoveMemberList");
  }

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
    return new RemoveMemberListResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.listId,
      ListMember: this.listMember,
    };
  }
}

/**
 * RemoveMemberList response message
 */
export class RemoveMemberListResponse extends OrganizationResponse {
  constructor() {
    super("RemoveMemberList");
  }

  static fromResponse(_data: unknown): RemoveMemberListResponse {
    return new RemoveMemberListResponse();
  }
}
