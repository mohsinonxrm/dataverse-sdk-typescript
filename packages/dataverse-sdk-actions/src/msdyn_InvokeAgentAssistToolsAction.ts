import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_InvokeAgentAssistTools action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeAgentAssistToolsResponse {
  "@odata.context"?: string;
  ToolResult: string;
}

/**
 * Parameters of the msdyn_InvokeAgentAssistTools action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeAgentAssistToolsActionParameters {
  ToolParameters: string;
  ToolName: string;
}

/**
 * msdyn_InvokeAgentAssistTools action
 *
 * Unbound action
 */
export class msdyn_InvokeAgentAssistToolsAction implements Executable<msdyn_InvokeAgentAssistToolsResponse> {
  constructor(public readonly parameters: msdyn_InvokeAgentAssistToolsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeAgentAssistTools`;

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

  async parseResponse(response: Response): Promise<msdyn_InvokeAgentAssistToolsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_InvokeAgentAssistToolsResponse;
  }
}
