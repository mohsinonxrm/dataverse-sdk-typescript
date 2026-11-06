import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ValidateConversationPayloadResponse as msdyn_ValidateConversationPayloadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ValidateConversationPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateConversationPayloadRequestParameters {
  ConversationId: string;
}

/**
 * msdyn_ValidateConversationPayload request message
 *
 * Web API Action: msdyn_ValidateConversationPayload
 */
export class msdyn_ValidateConversationPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateConversationPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_ValidateConversationPayloadRequestParameters>;

  constructor(parameters: msdyn_ValidateConversationPayloadRequestParameters) {
    super("msdyn_ValidateConversationPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateConversationPayload`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_ValidateConversationPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ValidateConversationPayloadResponse.fromResponse({});
    return msdyn_ValidateConversationPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ValidateConversationPayload response message
 */
export class msdyn_ValidateConversationPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateConversationPayloadResponseData) {
    super("msdyn_ValidateConversationPayload");
  }

  static fromResponse(data: unknown): msdyn_ValidateConversationPayloadResponse {
    return new msdyn_ValidateConversationPayloadResponse(
      responseObject<msdyn_ValidateConversationPayloadResponseData>(data)
    );
  }
}
