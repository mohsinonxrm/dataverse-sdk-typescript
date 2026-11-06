import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from McpCreateTable action
 */
export interface McpCreateTableResponse {
  successMessage: string;
}

/**
 * Parameters of the McpCreateTable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpCreateTableActionParameters {
  displayname?: string;
  item: string;
  tablename: string;
  description?: string;
}

/**
 * McpCreateTable action
 *
 * Unbound action
 */
export class McpCreateTableAction implements Executable<McpCreateTableResponse> {
  constructor(public readonly parameters: McpCreateTableActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpCreateTable`;

    const body = requestBody({
      displayname: this.parameters.displayname,
      item: this.parameters.item,
      tablename: this.parameters.tablename,
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

  async parseResponse(response: Response): Promise<McpCreateTableResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as McpCreateTableResponse;
  }
}
