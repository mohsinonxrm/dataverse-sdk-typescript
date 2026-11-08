import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/lists(${odataLiteral.guid(this.listId)})/Microsoft.Dynamics.CRM.AddMemberList`;

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
    // The body is the complex value, with its @odata.context
    return AddMemberListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddMemberList action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddMemberListResult {
  "@odata.context"?: string;
  Id: string;
}

/**
 * AddMemberList response message
 *
 * `result` is the value the AddMemberList action returns (see {@link AddMemberListResult}).
 */
export class AddMemberListResponse extends OrganizationResponse {
  constructor(public result: AddMemberListResult) {
    super("AddMemberList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddMemberListResponse {
    return new AddMemberListResponse(data as AddMemberListResult);
  }
}
