import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExecuteAgentAssistTools action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteAgentAssistToolsResponse {
  "@odata.context"?: string;
  ToolResult: string;
}

/**
 * Parameters of the msdyn_ExecuteAgentAssistTools action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAgentAssistToolsActionParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_ExecuteAgentAssistTools action
 *
 * Unbound action
 */
export class msdyn_ExecuteAgentAssistToolsAction implements Executable<msdyn_ExecuteAgentAssistToolsResponse> {
  constructor(public readonly parameters: msdyn_ExecuteAgentAssistToolsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAgentAssistTools`;

    const body = requestBody({
      ToolParameters: this.parameters.ToolParameters,
      ToolName: this.parameters.ToolName,
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
    return (await response.json()) as msdyn_ExecuteAgentAssistToolsResponse;
  }
}
