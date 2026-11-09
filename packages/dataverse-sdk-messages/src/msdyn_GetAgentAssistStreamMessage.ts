import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAgentAssistStreamResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAgentAssistStream action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAgentAssistStreamResult {
  "@odata.context"?: string;
  Result: string[];
}

/**
 * msdyn_GetAgentAssistStream response message
 *
 * `result` is the value the msdyn_GetAgentAssistStream action returns (see {@link msdyn_GetAgentAssistStreamResult}).
 */
export class msdyn_GetAgentAssistStreamResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentAssistStreamResult) {
    super("msdyn_GetAgentAssistStream");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAgentAssistStreamResponse {
    return new msdyn_GetAgentAssistStreamResponse(data as msdyn_GetAgentAssistStreamResult);
  }
}
