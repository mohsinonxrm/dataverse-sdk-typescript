import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpUpdateGlobalOptionSet action
 */
export interface McpUpdateGlobalOptionSetResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as McpUpdateGlobalOptionSetResponse;
    return (await response.json()) as McpUpdateGlobalOptionSetResponse;
  }
}
