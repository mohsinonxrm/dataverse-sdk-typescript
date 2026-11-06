import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { listmember } from "./types/index.js";

/**
 * Parameters of the RemoveMemberList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveMemberListRequestParameters {
  ListMember: EntityReference | EntityPayload<listmember>;
}

/**
 * RemoveMemberList request message
 *
 * Web API Action: RemoveMemberList
 *
 * The first argument is the id of the list record to call it on.
 */
export class RemoveMemberListRequest
  extends OrganizationRequest
  implements Executable<RemoveMemberListResponse>
{
  declare readonly Parameters: Readonly<RemoveMemberListRequestParameters>;

  constructor(
    public listId: string,
    parameters: RemoveMemberListRequestParameters
  ) {
    super("RemoveMemberList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.RemoveMemberList`;

    const body = requestBody({
      ListMember: this.Parameters.ListMember,
    });

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
