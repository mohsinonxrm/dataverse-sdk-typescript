import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetKnowledgeDraftAssistStream request message
 *
 * Web API Action: msdyn_GetKnowledgeDraftAssistStream
 */
export class msdyn_GetKnowledgeDraftAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKnowledgeDraftAssistStreamResponse>
{
  constructor(
    public requestPayload: string,
    public context?: string
  ) {
    super("msdyn_GetKnowledgeDraftAssistStream");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeDraftAssistStream`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
      Context: this.context,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeDraftAssistStreamResponse> {
    // No return value (204 No Content)
    return new msdyn_GetKnowledgeDraftAssistStreamResponse();
  }
}

/**
 * msdyn_GetKnowledgeDraftAssistStream response message
 */
export class msdyn_GetKnowledgeDraftAssistStreamResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetKnowledgeDraftAssistStream");
  }

  static fromResponse(_data: unknown): msdyn_GetKnowledgeDraftAssistStreamResponse {
    return new msdyn_GetKnowledgeDraftAssistStreamResponse();
  }
}
