import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeAgentAssistTools message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeAgentAssistToolsRequestParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_InvokeAgentAssistTools request message
 *
 * Web API Action: msdyn_InvokeAgentAssistTools
 */
export class msdyn_InvokeAgentAssistToolsRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeAgentAssistToolsResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeAgentAssistToolsRequestParameters>;

  constructor(parameters: msdyn_InvokeAgentAssistToolsRequestParameters) {
    super("msdyn_InvokeAgentAssistTools", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeAgentAssistTools`;

    const body = requestBody({
      ToolParameters: this.Parameters.ToolParameters,
      ToolName: this.Parameters.ToolName,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeAgentAssistToolsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeAgentAssistToolsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeAgentAssistTools action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeAgentAssistToolsResult {
  "@odata.context"?: string;
  ToolResult: string;
}

/**
 * msdyn_InvokeAgentAssistTools response message
 *
 * `result` is the value the msdyn_InvokeAgentAssistTools action returns (see {@link msdyn_InvokeAgentAssistToolsResult}).
 */
export class msdyn_InvokeAgentAssistToolsResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeAgentAssistToolsResult) {
    super("msdyn_InvokeAgentAssistTools");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeAgentAssistToolsResponse {
    return new msdyn_InvokeAgentAssistToolsResponse(data as msdyn_InvokeAgentAssistToolsResult);
  }
}
