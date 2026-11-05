import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { list } from "./types/index.js";

/**
 * CopyMembersList request message
 *
 * Web API Action: CopyMembersList
 */
export class CopyMembersListRequest
  extends OrganizationRequest
  implements Executable<CopyMembersListResponse>
{
  constructor(
    public listId: string,
    public targetList: list
  ) {
    super("CopyMembersList");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CopyMembersListResponse> {
    // No return value (204 No Content)
    return new CopyMembersListResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.listId,
      TargetList: this.targetList,
    };
  }
}

/**
 * CopyMembersList response message
 */
export class CopyMembersListResponse extends OrganizationResponse {
  constructor() {
    super("CopyMembersList");
  }

  static fromResponse(_data: unknown): CopyMembersListResponse {
    return new CopyMembersListResponse();
  }
}
