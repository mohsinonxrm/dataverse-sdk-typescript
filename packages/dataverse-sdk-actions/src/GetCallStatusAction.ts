import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetCallStatus action
 */
export interface GetCallStatusResponse {
  ConversationId: string;
  Status: string;
}

/**
 * Parameters of the GetCallStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetCallStatusActionParameters {
  ConversationId: string;
  ApiVersion: string;
}

/**
 * GetCallStatus action
 *
 * Unbound action
 */
export class GetCallStatusAction implements Executable<GetCallStatusResponse> {
  constructor(public readonly parameters: GetCallStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCallStatus`;

    const body = requestBody({
      ConversationId: this.parameters.ConversationId,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<GetCallStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetCallStatusResponse;
    return (await response.json()) as GetCallStatusResponse;
  }
}
