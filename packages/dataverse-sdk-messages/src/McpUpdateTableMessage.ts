import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<McpUpdateTableResponse> {
    const data = await response.json();
    return McpUpdateTableResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      newDisplayName: this.newDisplayName,
      tablename: this.tablename,
      item: this.item,
      description: this.description,
    };
  }
}

/**
 * McpUpdateTable response message
 */
export class McpUpdateTableResponse extends OrganizationResponse {
  constructor(public result: McpUpdateTableResponse) {
    super("McpUpdateTable");
  }

  static fromResponse(data: unknown): McpUpdateTableResponse {
    return new McpUpdateTableResponse((data as any).value);
  }
}
