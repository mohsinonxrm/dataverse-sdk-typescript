import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAgentAssistStreamResponse as msdyn_GetAgentAssistStreamResponseData } from "./types/index.js";

/**
 * msdyn_GetAgentAssistStream request message
 *
 * Web API Action: msdyn_GetAgentAssistStream
 */
export class msdyn_GetAgentAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentAssistStreamResponse>
{
  constructor(
    public context: string,
    public requestPayload: string
  ) {
    super("msdyn_GetAgentAssistStream");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentAssistStream`;

    const body: Record<string, unknown> = {
      Context: this.context,
      RequestPayload: this.requestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentAssistStreamResponse> {
    const data = await response.json();
    return msdyn_GetAgentAssistStreamResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAgentAssistStream response message
 */
export class msdyn_GetAgentAssistStreamResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentAssistStreamResponseData) {
    super("msdyn_GetAgentAssistStream");
  }

  static fromResponse(data: unknown): msdyn_GetAgentAssistStreamResponse {
    return new msdyn_GetAgentAssistStreamResponse(
      responseObject<msdyn_GetAgentAssistStreamResponseData>(data)
    );
  }
}
