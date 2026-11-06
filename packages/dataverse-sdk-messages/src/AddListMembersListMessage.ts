import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Parameters of the AddListMembersList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddListMembersListRequestParameters {
  List: EntityReference | EntityPayload<list>;
  Members: Record<string, unknown>[];
}

/**
 * AddListMembersList request message
 *
 * Web API Action: AddListMembersList
 */
export class AddListMembersListRequest
  extends OrganizationRequest
  implements Executable<AddListMembersListResponse>
{
  declare readonly Parameters: Readonly<AddListMembersListRequestParameters>;

  constructor(parameters: AddListMembersListRequestParameters) {
    super("AddListMembersList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddListMembersList`;

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

  parseResponse(_response: Response): Promise<AddListMembersListResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AddListMembersListResponse());
  }
}

/**
 * AddListMembersList response message
 */
export class AddListMembersListResponse extends OrganizationResponse {
  constructor() {
    super("AddListMembersList");
  }

  static fromResponse(_data?: unknown): AddListMembersListResponse {
    return new AddListMembersListResponse();
  }
}
