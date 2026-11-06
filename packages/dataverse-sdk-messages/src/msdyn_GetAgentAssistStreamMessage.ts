import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAgentAssistStreamResponse as msdyn_GetAgentAssistStreamResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAgentAssistStream message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentAssistStreamRequestParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetAgentAssistStream request message
 *
 * Web API Action: msdyn_GetAgentAssistStream
 */
export class msdyn_GetAgentAssistStreamRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentAssistStreamResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAgentAssistStreamRequestParameters>;

  constructor(parameters: msdyn_GetAgentAssistStreamRequestParameters) {
    super("msdyn_GetAgentAssistStream", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentAssistStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetAgentAssistStreamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAgentAssistStreamResponse.fromResponse(text ? JSON.parse(text) : {});
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
