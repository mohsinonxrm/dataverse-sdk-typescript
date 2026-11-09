import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKnowledgeDraftAssistStream message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKnowledgeDraftAssistStreamRequestParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetKnowledgeDraftAssistStream request message
 *
 * Web API Action: msdyn_GetKnowledgeDraftAssistStream
 */
export class msdyn_GetKnowledgeDraftAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKnowledgeDraftAssistStreamResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKnowledgeDraftAssistStreamRequestParameters>;

  constructor(parameters: msdyn_GetKnowledgeDraftAssistStreamRequestParameters) {
    super("msdyn_GetKnowledgeDraftAssistStream", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeDraftAssistStream`;

    const body = requestBody({
      Context: this.Parameters.Context,
      RequestPayload: this.Parameters.RequestPayload,
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

  parseResponse(_response: Response): Promise<msdyn_GetKnowledgeDraftAssistStreamResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_GetKnowledgeDraftAssistStreamResponse());
  }
}

/**
 * msdyn_GetKnowledgeDraftAssistStream response message
 */
export class msdyn_GetKnowledgeDraftAssistStreamResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetKnowledgeDraftAssistStream");
  }

  static fromResponse(_data?: unknown): msdyn_GetKnowledgeDraftAssistStreamResponse {
    return new msdyn_GetKnowledgeDraftAssistStreamResponse();
  }
}
