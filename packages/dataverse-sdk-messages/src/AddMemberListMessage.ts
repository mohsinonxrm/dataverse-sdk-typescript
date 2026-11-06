import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AddMemberListResponse as AddMemberListResponseData } from "./types/index.js";

/**
 * Parameters of the AddMemberList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMemberListRequestParameters {
  EntityId: string;
}

/**
 * AddMemberList request message
 *
 * Web API Action: AddMemberList
 *
 * The first argument is the id of the list record to call it on.
 */
export class AddMemberListRequest
  extends OrganizationRequest
  implements Executable<AddMemberListResponse>
{
  declare readonly Parameters: Readonly<AddMemberListRequestParameters>;

  constructor(
    public listId: string,
    parameters: AddMemberListRequestParameters
  ) {
    super("AddMemberList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.AddMemberList`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
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

  async parseResponse(response: Response): Promise<AddMemberListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddMemberListResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AddMemberList response message
 */
export class AddMemberListResponse extends OrganizationResponse {
  constructor(public result: AddMemberListResponseData) {
    super("AddMemberList");
  }

  static fromResponse(data: unknown): AddMemberListResponse {
    return new AddMemberListResponse(responseObject<AddMemberListResponseData>(data));
  }
}
