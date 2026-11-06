import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCopilotServiceStream message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotServiceStreamRequestParameters {
  RequestPayload?: string;
  Context: string;
}

/**
 * msdyn_GetCopilotServiceStream request message
 *
 * Web API Action: msdyn_GetCopilotServiceStream
 */
export class msdyn_GetCopilotServiceStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotServiceStreamResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCopilotServiceStreamRequestParameters>;

  constructor(parameters: msdyn_GetCopilotServiceStreamRequestParameters) {
    super("msdyn_GetCopilotServiceStream", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotServiceStream`;

    const body = requestBody({
      RequestPayload: this.Parameters.RequestPayload,
      Context: this.Parameters.Context,
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
