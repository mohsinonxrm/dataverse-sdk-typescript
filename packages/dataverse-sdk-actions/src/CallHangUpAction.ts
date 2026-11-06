import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CallHangUp action
 */
export interface CallHangUpResponse {
  Response: string;
}

/**
 * Parameters of the CallHangUp action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CallHangUpActionParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * CallHangUp action
 *
 * Unbound action
 */
export class CallHangUpAction implements Executable<CallHangUpResponse> {
  constructor(public readonly parameters: CallHangUpActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CallHangUp`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      ConversationId: this.parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<CallHangUpResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CallHangUpResponse;
    return (await response.json()) as CallHangUpResponse;
  }
}
