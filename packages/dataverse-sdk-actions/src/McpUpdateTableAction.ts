import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpUpdateTable action
 */
export interface McpUpdateTableResponse {
  successMessage: string;
  usage: string;
}

/**
 * Parameters of the McpUpdateTable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateTableActionParameters {
  description?: string;
  newDisplayName?: string;
  item: string;
  tablename: string;
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
      description: this.parameters.description,
      newDisplayName: this.parameters.newDisplayName,
      item: this.parameters.item,
      tablename: this.parameters.tablename,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as McpUpdateTableResponse;
    return (await response.json()) as McpUpdateTableResponse;
  }
}
