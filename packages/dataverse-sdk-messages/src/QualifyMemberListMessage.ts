import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * QualifyMemberList request message
 *
 * Web API Action: QualifyMemberList
 */
export class QualifyMemberListRequest
  extends OrganizationRequest
  implements Executable<QualifyMemberListResponse>
{
  constructor(
    public listId: string,
    public listMember: Record<string, unknown>[],
    public overrideorRemove: boolean
  ) {
    super("QualifyMemberList");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.QualifyMemberList`;

    const body: Record<string, unknown> = {
      ListMember: this.listMember,
      OverrideorRemove: this.overrideorRemove,
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

  async parseResponse(response: Response): Promise<QualifyMemberListResponse> {
    // No return value (204 No Content)
    return new QualifyMemberListResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.listId,
      ListMember: this.listMember,
      OverrideorRemove: this.overrideorRemove,
    };
  }
}

/**
 * QualifyMemberList response message
 */
export class QualifyMemberListResponse extends OrganizationResponse {
  constructor() {
    super("QualifyMemberList");
  }

  static fromResponse(_data: unknown): QualifyMemberListResponse {
    return new QualifyMemberListResponse();
  }
}
