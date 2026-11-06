import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCopilotServiceStream request message
 *
 * Web API Action: msdyn_GetCopilotServiceStream
 */
export class msdyn_GetCopilotServiceStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotServiceStreamResponse>
{
  constructor(
    public requestPayload: string | undefined,
    public context: string
  ) {
    super("msdyn_GetCopilotServiceStream");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotServiceStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCopilotServiceStreamResponse> {
    // No return value (204 No Content)
    return new msdyn_GetCopilotServiceStreamResponse();
  }
}

/**
 * msdyn_GetCopilotServiceStream response message
 */
export class msdyn_GetCopilotServiceStreamResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetCopilotServiceStream");
  }

  static fromResponse(_data: unknown): msdyn_GetCopilotServiceStreamResponse {
    return new msdyn_GetCopilotServiceStreamResponse();
  }
}
