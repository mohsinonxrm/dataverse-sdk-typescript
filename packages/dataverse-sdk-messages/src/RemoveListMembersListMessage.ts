import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Parameters of the RemoveListMembersList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveListMembersListRequestParameters {
  List: EntityReference | EntityPayload<list>;
  Members: Record<string, unknown>[];
}

/**
 * RemoveListMembersList request message
 *
 * Web API Action: RemoveListMembersList
 */
export class RemoveListMembersListRequest
  extends OrganizationRequest
  implements Executable<RemoveListMembersListResponse>
{
  declare readonly Parameters: Readonly<RemoveListMembersListRequestParameters>;

  constructor(parameters: RemoveListMembersListRequestParameters) {
    super("RemoveListMembersList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveListMembersList`;

    const body = requestBody({
      List: this.Parameters.List,
      Members: this.Parameters.Members,
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
