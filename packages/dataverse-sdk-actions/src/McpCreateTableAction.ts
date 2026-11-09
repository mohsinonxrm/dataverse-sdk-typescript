import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the McpCreateTable action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpCreateTableResponse {
  "@odata.context"?: string;
  successMessage: string;
  usage: string;
}

/**
 * Parameters of the McpCreateTable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpCreateTableActionParameters {
  item: string;
  displayname?: string;
  description?: string;
  tablename: string;
  publisherprefix?: string;
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
      item: this.parameters.item,
      displayname: this.parameters.displayname,
      description: this.parameters.description,
      tablename: this.parameters.tablename,
      publisherprefix: this.parameters.publisherprefix,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as McpCreateTableResponse;
  }
}
