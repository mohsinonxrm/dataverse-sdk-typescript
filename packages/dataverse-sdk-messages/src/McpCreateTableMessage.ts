import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the McpCreateTable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpCreateTableRequestParameters {
  item: string;
  displayname?: string;
  description?: string;
  tablename: string;
  publisherprefix?: string;
}

/**
 * McpCreateTable request message
 *
 * Web API Action: McpCreateTable
 */
export class McpCreateTableRequest
  extends OrganizationRequest
  implements Executable<McpCreateTableResponse>
{
  declare readonly Parameters: Readonly<McpCreateTableRequestParameters>;

  constructor(parameters: McpCreateTableRequestParameters) {
    super("McpCreateTable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpCreateTable`;

    const body = requestBody({
      item: this.Parameters.item,
      displayname: this.Parameters.displayname,
      description: this.Parameters.description,
      tablename: this.Parameters.tablename,
      publisherprefix: this.Parameters.publisherprefix,
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
    return McpCreateTableResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpCreateTable action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpCreateTableResult {
  "@odata.context"?: string;
  successMessage: string;
  usage: string;
}

/**
 * McpCreateTable response message
 *
 * `result` is the value the McpCreateTable action returns (see {@link McpCreateTableResult}).
 */
export class McpCreateTableResponse extends OrganizationResponse {
  constructor(public result: McpCreateTableResult) {
    super("McpCreateTable");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpCreateTableResponse {
    return new McpCreateTableResponse(data as McpCreateTableResult);
  }
}
