import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEmailAssistStream message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEmailAssistStreamRequestParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetEmailAssistStream request message
 *
 * Web API Action: msdyn_GetEmailAssistStream
 */
export class msdyn_GetEmailAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEmailAssistStreamResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEmailAssistStreamRequestParameters>;

  constructor(parameters: msdyn_GetEmailAssistStreamRequestParameters) {
    super("msdyn_GetEmailAssistStream", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEmailAssistStream`;

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

  parseResponse(_response: Response): Promise<msdyn_GetEmailAssistStreamResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_GetEmailAssistStreamResponse());
  }
}

/**
 * msdyn_GetEmailAssistStream response message
 */
export class msdyn_GetEmailAssistStreamResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetEmailAssistStream");
  }

  static fromResponse(_data?: unknown): msdyn_GetEmailAssistStreamResponse {
    return new msdyn_GetEmailAssistStreamResponse();
  }
}
