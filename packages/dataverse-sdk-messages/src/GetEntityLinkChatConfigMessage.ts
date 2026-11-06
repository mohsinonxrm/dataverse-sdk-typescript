import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetEntityLinkChatConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetEntityLinkChatConfigRequestParameters {
  RegardingEntityName: string;
}

/**
 * GetEntityLinkChatConfig request message
 *
 * Web API Action: GetEntityLinkChatConfig
 */
export class GetEntityLinkChatConfigRequest
  extends OrganizationRequest
  implements Executable<GetEntityLinkChatConfigResponse>
{
  declare readonly Parameters: Readonly<GetEntityLinkChatConfigRequestParameters>;

  constructor(parameters: GetEntityLinkChatConfigRequestParameters) {
    super("GetEntityLinkChatConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntityLinkChatConfig`;

    const body = requestBody({
      RegardingEntityName: this.Parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<GetEntityLinkChatConfigResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GetEntityLinkChatConfigResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GetEntityLinkChatConfig response message
 */
export class GetEntityLinkChatConfigResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GetEntityLinkChatConfig");
  }

  static fromResponse(data: unknown): GetEntityLinkChatConfigResponse {
    return new GetEntityLinkChatConfigResponse(responseObject<Record<string, unknown>>(data));
  }
}
