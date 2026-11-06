import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetMessageResponse as GetMessageResponseData } from "./types/index.js";

/**
 * Parameters of the GetMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetMessageRequestParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * GetMessage request message
 *
 * Web API Action: GetMessage
 */
export class GetMessageRequest
  extends OrganizationRequest
  implements Executable<GetMessageResponse>
{
  declare readonly Parameters: Readonly<GetMessageRequestParameters>;

  constructor(parameters: GetMessageRequestParameters) {
    super("GetMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetMessage`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<GetMessageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetMessageResponse.fromResponse({});
    return GetMessageResponse.fromResponse(await response.json());
  }
}

/**
 * GetMessage response message
 */
export class GetMessageResponse extends OrganizationResponse {
  constructor(public result: GetMessageResponseData) {
    super("GetMessage");
  }

  static fromResponse(data: unknown): GetMessageResponse {
    return new GetMessageResponse(responseObject<GetMessageResponseData>(data));
  }
}
