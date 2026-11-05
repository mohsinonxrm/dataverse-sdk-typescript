import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { McpUpdateTableResponse as McpUpdateTableResponseData } from "./types/index.js";

/**
 * McpUpdateTable request message
 *
 * Web API Action: McpUpdateTable
 */
export class McpUpdateTableRequest
  extends OrganizationRequest
  implements Executable<McpUpdateTableResponse>
{
  constructor(
    public newDisplayName: string,
    public tablename: string,
    public item: string,
    public description: string
  ) {
    super("McpUpdateTable");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateTable`;

    const body: Record<string, unknown> = {
      newDisplayName: this.newDisplayName,
      tablename: this.tablename,
      item: this.item,
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

  async parseResponse(response: Response): Promise<McpUpdateTableResponse> {
    const data = await response.json();
    return McpUpdateTableResponse.fromResponse(data);
  }
}

/**
 * McpUpdateTable response message
 */
export class McpUpdateTableResponse extends OrganizationResponse {
  constructor(public result: McpUpdateTableResponseData) {
    super("McpUpdateTable");
  }

  static fromResponse(data: unknown): McpUpdateTableResponse {
    return new McpUpdateTableResponse(responseObject<McpUpdateTableResponseData>(data));
  }
}
