import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpUpdateTable action
 */
export interface McpUpdateTableResponse {
  successMessage: string;
}

/**
 * Parameters of the McpUpdateTable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateTableActionParameters {
  newDisplayName?: string;
  tablename: string;
  item: string;
  description?: string;
}

/**
 * McpUpdateTable action
 *
 * Unbound action
 */
export class McpUpdateTableAction implements Executable<McpUpdateTableResponse> {
  constructor(public readonly parameters: McpUpdateTableActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateTable`;

    const body = requestBody({
      newDisplayName: this.parameters.newDisplayName,
      tablename: this.parameters.tablename,
      item: this.parameters.item,
      description: this.parameters.description,
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

  async parseResponse(response: Response): Promise<McpUpdateTableResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as McpUpdateTableResponse;
  }
}
