import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AddMembersBatchList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMembersBatchListRequestParameters {
  ListId?: string;
  FetchXml?: string;
  SkipCount?: number;
}

/**
 * AddMembersBatchList request message
 *
 * Web API Action: AddMembersBatchList
 */
export class AddMembersBatchListRequest
  extends OrganizationRequest
  implements Executable<AddMembersBatchListResponse>
{
  declare readonly Parameters: Readonly<AddMembersBatchListRequestParameters>;

  constructor(parameters: AddMembersBatchListRequestParameters = {}) {
    super("AddMembersBatchList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddMembersBatchList`;

    const body = requestBody({
      ListId: this.Parameters.ListId,
      FetchXml: this.Parameters.FetchXml,
      SkipCount: this.Parameters.SkipCount,
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

  async parseResponse(response: Response): Promise<AddMembersBatchListResponse> {
    // The body is the complex value, with its @odata.context
    return AddMembersBatchListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddMembersBatchList action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddMembersBatchListResult {
  "@odata.context"?: string;
  SkipCountAfter: number;
}

/**
 * AddMembersBatchList response message
 *
 * `result` is the value the AddMembersBatchList action returns (see {@link AddMembersBatchListResult}).
 */
export class AddMembersBatchListResponse extends OrganizationResponse {
  constructor(public result: AddMembersBatchListResult) {
    super("AddMembersBatchList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddMembersBatchListResponse {
    return new AddMembersBatchListResponse(data as AddMembersBatchListResult);
  }
}
