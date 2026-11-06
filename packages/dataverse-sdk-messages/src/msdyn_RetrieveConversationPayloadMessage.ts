import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveConversationPayloadResponse as msdyn_RetrieveConversationPayloadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveConversationPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveConversationPayloadRequestParameters {
  ConversationId: string;
  ParticipantScope?: number;
}

/**
 * msdyn_RetrieveConversationPayload request message
 *
 * Web API Action: msdyn_RetrieveConversationPayload
 */
export class msdyn_RetrieveConversationPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveConversationPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveConversationPayloadRequestParameters>;

  constructor(parameters: msdyn_RetrieveConversationPayloadRequestParameters) {
    super("msdyn_RetrieveConversationPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveConversationPayload`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      ParticipantScope: this.Parameters.ParticipantScope,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveConversationPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveConversationPayloadResponse.fromResponse({});
    return msdyn_RetrieveConversationPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveConversationPayload response message
 */
export class msdyn_RetrieveConversationPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveConversationPayloadResponseData) {
    super("msdyn_RetrieveConversationPayload");
  }

  static fromResponse(data: unknown): msdyn_RetrieveConversationPayloadResponse {
    return new msdyn_RetrieveConversationPayloadResponse(
      responseObject<msdyn_RetrieveConversationPayloadResponseData>(data)
    );
  }
}
