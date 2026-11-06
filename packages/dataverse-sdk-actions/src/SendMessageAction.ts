import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SendMessage action
 */
export interface SendMessageResponse {
  Status: string;
}

/**
 * Parameters of the SendMessage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendMessageActionParameters {
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
 * SendMessage action
 *
 * Unbound action
 */
export class SendMessageAction implements Executable<SendMessageResponse> {
  constructor(public readonly parameters: SendMessageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendMessage`;

    const body = requestBody({
      SpeechText: this.parameters.SpeechText,
      VoiceGender: this.parameters.VoiceGender,
      CallConnectionId: this.parameters.CallConnectionId,
      InternalSessionId: this.parameters.InternalSessionId,
      ApiVersion: this.parameters.ApiVersion,
      ConversationId: this.parameters.ConversationId,
      Language: this.parameters.Language,
      VoiceName: this.parameters.VoiceName,
      TestSessionId: this.parameters.TestSessionId,
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
    if (response.status === 204) return {} as SendMessageResponse;
    return (await response.json()) as SendMessageResponse;
  }
}
