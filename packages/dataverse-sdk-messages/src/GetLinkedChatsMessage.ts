import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { GetLinkedChatsResponse as GetLinkedChatsResponseData } from "./types/index.js";

/**
 * Parameters of the GetLinkedChats message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetLinkedChatsRequestParameters {
  RegardingEntity: EntityReference | AnyEntityPayload;
}

/**
 * GetLinkedChats request message
 *
 * Web API Action: GetLinkedChats
 */
export class GetLinkedChatsRequest
  extends OrganizationRequest
  implements Executable<GetLinkedChatsResponse>
{
  declare readonly Parameters: Readonly<GetLinkedChatsRequestParameters>;

  constructor(parameters: GetLinkedChatsRequestParameters) {
    super("GetLinkedChats", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetLinkedChats`;

    const body = requestBody({
      RegardingEntity: this.Parameters.RegardingEntity,
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

  async parseResponse(response: Response): Promise<GetLinkedChatsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetLinkedChatsResponse.fromResponse({});
    return GetLinkedChatsResponse.fromResponse(await response.json());
  }
}

/**
 * GetLinkedChats response message
 */
export class GetLinkedChatsResponse extends OrganizationResponse {
  constructor(public result: GetLinkedChatsResponseData) {
    super("GetLinkedChats");
  }

  static fromResponse(data: unknown): GetLinkedChatsResponse {
    return new GetLinkedChatsResponse(responseObject<GetLinkedChatsResponseData>(data));
  }
}
