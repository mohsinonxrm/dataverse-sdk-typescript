import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetLinkedChatsResponse> {
    const data = await response.json();
    return GetLinkedChatsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RegardingEntity: this.regardingEntity,
    };
  }
}

/**
 * GetLinkedChats response message
 */
export class GetLinkedChatsResponse extends OrganizationResponse {
  constructor(public result: GetLinkedChatsResponse) {
    super("GetLinkedChats");
  }

  static fromResponse(data: unknown): GetLinkedChatsResponse {
    return new GetLinkedChatsResponse((data as any).value);
  }
}
