import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { GetLinkedChatsResponse as GetLinkedChatsResponseData } from "./types/index.js";

/**
 * GetLinkedChats request message
 *
 * Web API Action: GetLinkedChats
 */
export class GetLinkedChatsRequest
  extends OrganizationRequest
  implements Executable<GetLinkedChatsResponse>
{
  constructor(public regardingEntity: EntityReference) {
    super("GetLinkedChats");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetLinkedChats`;

    const body: Record<string, unknown> = {
      RegardingEntity: this.regardingEntity,
    };

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
    const data = await response.json();
    return GetLinkedChatsResponse.fromResponse(data);
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
