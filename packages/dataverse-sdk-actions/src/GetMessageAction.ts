import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetMessageResponse {
  "@odata.context"?: string;
  Messages: string;
}

/**
 * Parameters of the GetMessage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetMessageActionParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * GetMessage action
 *
 * Unbound action
 */
export class GetMessageAction implements Executable<GetMessageResponse> {
  constructor(public readonly parameters: GetMessageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetMessage`;

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

  async parseResponse(response: Response): Promise<GetMessageResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetMessageResponse;
  }
}
