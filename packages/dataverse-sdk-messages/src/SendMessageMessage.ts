import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SendMessageResponse as SendMessageResponseData } from "./types/index.js";

/**
 * Parameters of the SendMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendMessageRequestParameters {
  SpeechText: string;
  VoiceGender?: string;
  CallConnectionId: string;
  InternalSessionId: string;
  ApiVersion: string;
  ConversationId: string;
  Language?: string;
  VoiceName?: string;
  TestSessionId: string;
}

/**
 * SendMessage request message
 *
 * Web API Action: SendMessage
 */
export class SendMessageRequest
  extends OrganizationRequest
  implements Executable<SendMessageResponse>
{
  declare readonly Parameters: Readonly<SendMessageRequestParameters>;

  constructor(parameters: SendMessageRequestParameters) {
    super("SendMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendMessage`;

    const body = requestBody({
      SpeechText: this.Parameters.SpeechText,
      VoiceGender: this.Parameters.VoiceGender,
      CallConnectionId: this.Parameters.CallConnectionId,
      InternalSessionId: this.Parameters.InternalSessionId,
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
      Language: this.Parameters.Language,
      VoiceName: this.Parameters.VoiceName,
      TestSessionId: this.Parameters.TestSessionId,
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

  async parseResponse(response: Response): Promise<SendMessageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SendMessageResponse.fromResponse({});
    return SendMessageResponse.fromResponse(await response.json());
  }
}

/**
 * SendMessage response message
 */
export class SendMessageResponse extends OrganizationResponse {
  constructor(public result: SendMessageResponseData) {
    super("SendMessage");
  }

  static fromResponse(data: unknown): SendMessageResponse {
    return new SendMessageResponse(responseObject<SendMessageResponseData>(data));
  }
}
