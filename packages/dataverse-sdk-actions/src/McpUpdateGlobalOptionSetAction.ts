import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the McpUpdateGlobalOptionSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpUpdateGlobalOptionSetResponse {
  "@odata.context"?: string;
  definition: string;
}

/**
 * Parameters of the McpUpdateGlobalOptionSet action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateGlobalOptionSetActionParameters {
  languageCode: number;
  optionSetName: string;
  confirmSharedImpact: boolean;
  choices: string;
}

/**
 * McpUpdateGlobalOptionSet action
 *
 * Unbound action
 */
export class McpUpdateGlobalOptionSetAction implements Executable<McpUpdateGlobalOptionSetResponse> {
  constructor(public readonly parameters: McpUpdateGlobalOptionSetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateGlobalOptionSet`;

    const body = requestBody({
      languageCode: this.parameters.languageCode,
      optionSetName: this.parameters.optionSetName,
      confirmSharedImpact: this.parameters.confirmSharedImpact,
      choices: this.parameters.choices,
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

  async parseResponse(response: Response): Promise<McpUpdateGlobalOptionSetResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as McpUpdateGlobalOptionSetResponse;
  }
}
