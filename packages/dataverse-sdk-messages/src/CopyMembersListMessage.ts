import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Parameters of the CopyMembersList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopyMembersListRequestParameters {
  TargetList: EntityReference | EntityPayload<list>;
}

/**
 * CopyMembersList request message
 *
 * Web API Action: CopyMembersList
 *
 * The first argument is the id of the list record to call it on.
 */
export class CopyMembersListRequest
  extends OrganizationRequest
  implements Executable<CopyMembersListResponse>
{
  declare readonly Parameters: Readonly<CopyMembersListRequestParameters>;

  constructor(
    public listId: string,
    parameters: CopyMembersListRequestParameters
  ) {
    super("CopyMembersList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyMembersList`;

    const body = requestBody({
      TargetList: this.Parameters.TargetList,
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

  async parseResponse(response: Response): Promise<CopyMembersListResponse> {
    // No return value (204 No Content)
    return new CopyMembersListResponse();
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
