import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddMemberList request message
 *
 * Web API Action: AddMemberList
 */
export class AddMemberListRequest
  extends OrganizationRequest
  implements Executable<AddMemberListResponse>
{
  constructor(
    public listId: string,
    public entityId: string
  ) {
    super("AddMemberList");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.AddMemberList`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
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

  async parseResponse(response: Response): Promise<AddMemberListResponse> {
    const data = await response.json();
    return AddMemberListResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.listId,
      EntityId: this.entityId,
    };
  }
}

/**
 * AddMemberList response message
 */
export class AddMemberListResponse extends OrganizationResponse {
  constructor(public result: AddMemberListResponse) {
    super("AddMemberList");
  }

  static fromResponse(data: unknown): AddMemberListResponse {
    return new AddMemberListResponse((data as any).value);
  }
}
