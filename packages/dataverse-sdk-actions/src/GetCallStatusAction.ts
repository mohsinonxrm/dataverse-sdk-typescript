import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetCallStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetCallStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetCallStatusResponse;
  }
}
