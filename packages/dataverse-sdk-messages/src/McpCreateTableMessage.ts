import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { McpCreateTableResponse as McpCreateTableResponseData } from "./types/index.js";

/**
 * McpCreateTable request message
 *
 * Web API Action: McpCreateTable
 */
export class McpCreateTableRequest
  extends OrganizationRequest
  implements Executable<McpCreateTableResponse>
{
  constructor(
    public displayname: string,
    public item: string,
    public tablename: string,
    public description: string
  ) {
    super("McpCreateTable");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpCreateTable`;

    const body: Record<string, unknown> = {
      displayname: this.displayname,
      item: this.item,
      tablename: this.tablename,
      description: this.description,
    };

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
    const data = await response.json();
    return McpCreateTableResponse.fromResponse(data);
  }
}

/**
 * McpCreateTable response message
 */
export class McpCreateTableResponse extends OrganizationResponse {
  constructor(public result: McpCreateTableResponseData) {
    super("McpCreateTable");
  }

  static fromResponse(data: unknown): McpCreateTableResponse {
    return new McpCreateTableResponse(responseObject<McpCreateTableResponseData>(data));
  }
}
