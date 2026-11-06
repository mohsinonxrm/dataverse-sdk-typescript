import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteAgentAssistTools message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAgentAssistToolsRequestParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_ExecuteAgentAssistTools request message
 *
 * Web API Action: msdyn_ExecuteAgentAssistTools
 */
export class msdyn_ExecuteAgentAssistToolsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteAgentAssistToolsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteAgentAssistToolsRequestParameters>;

  constructor(parameters: msdyn_ExecuteAgentAssistToolsRequestParameters) {
    super("msdyn_ExecuteAgentAssistTools", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAgentAssistTools`;

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

  async parseResponse(response: Response): Promise<msdyn_ExecuteAgentAssistToolsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteAgentAssistToolsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteAgentAssistTools action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteAgentAssistToolsResult {
  "@odata.context"?: string;
  ToolResult: string;
}

/**
 * msdyn_ExecuteAgentAssistTools response message
 *
 * `result` is the value the msdyn_ExecuteAgentAssistTools action returns (see {@link msdyn_ExecuteAgentAssistToolsResult}).
 */
export class msdyn_ExecuteAgentAssistToolsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteAgentAssistToolsResult) {
    super("msdyn_ExecuteAgentAssistTools");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteAgentAssistToolsResponse {
    return new msdyn_ExecuteAgentAssistToolsResponse(data as msdyn_ExecuteAgentAssistToolsResult);
  }
}
