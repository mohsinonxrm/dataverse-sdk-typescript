import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the McpUpdateTable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateTableRequestParameters {
  description?: string;
  newDisplayName?: string;
  item: string;
  tablename: string;
}

/**
 * McpUpdateTable request message
 *
 * Web API Action: McpUpdateTable
 */
export class McpUpdateTableRequest
  extends OrganizationRequest
  implements Executable<McpUpdateTableResponse>
{
  declare readonly Parameters: Readonly<McpUpdateTableRequestParameters>;

  constructor(parameters: McpUpdateTableRequestParameters) {
    super("McpUpdateTable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateTable`;

    const body = requestBody({
      description: this.Parameters.description,
      newDisplayName: this.Parameters.newDisplayName,
      item: this.Parameters.item,
      tablename: this.Parameters.tablename,
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
    // The body is the complex value, with its @odata.context
    return McpUpdateTableResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpUpdateTable action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpUpdateTableResult {
  "@odata.context"?: string;
  successMessage: string;
  usage: string;
}

/**
 * McpUpdateTable response message
 *
 * `result` is the value the McpUpdateTable action returns (see {@link McpUpdateTableResult}).
 */
export class McpUpdateTableResponse extends OrganizationResponse {
  constructor(public result: McpUpdateTableResult) {
    super("McpUpdateTable");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpUpdateTableResponse {
    return new McpUpdateTableResponse(data as McpUpdateTableResult);
  }
}
