import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AddMembersBatchListResponse as AddMembersBatchListResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddMembersBatchListResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AddMembersBatchList response message
 */
export class AddMembersBatchListResponse extends OrganizationResponse {
  constructor(public result: AddMembersBatchListResponseData) {
    super("AddMembersBatchList");
  }

  static fromResponse(data: unknown): AddMembersBatchListResponse {
    return new AddMembersBatchListResponse(responseObject<AddMembersBatchListResponseData>(data));
  }
}
