import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetEmailAssistStream request message
 *
 * Web API Action: msdyn_GetEmailAssistStream
 */
export class msdyn_GetEmailAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEmailAssistStreamResponse>
{
  constructor(
    public context: string,
    public requestPayload: string
  ) {
    super("msdyn_GetEmailAssistStream");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEmailAssistStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEmailAssistStreamResponse> {
    // No return value (204 No Content)
    return new msdyn_GetEmailAssistStreamResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Context: this.context,
      RequestPayload: this.requestPayload,
    };
  }
}

/**
 * msdyn_GetEmailAssistStream response message
 */
export class msdyn_GetEmailAssistStreamResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetEmailAssistStream");
  }

  static fromResponse(_data: unknown): msdyn_GetEmailAssistStreamResponse {
    return new msdyn_GetEmailAssistStreamResponse();
  }
}
