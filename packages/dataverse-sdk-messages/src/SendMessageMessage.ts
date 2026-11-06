import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return SendMessageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SendMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SendMessageResult {
  "@odata.context"?: string;
  Status: string;
}

/**
 * SendMessage response message
 *
 * `result` is the value the SendMessage action returns (see {@link SendMessageResult}).
 */
export class SendMessageResponse extends OrganizationResponse {
  constructor(public result: SendMessageResult) {
    super("SendMessage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SendMessageResponse {
    return new SendMessageResponse(data as SendMessageResult);
  }
}
