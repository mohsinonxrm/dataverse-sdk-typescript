import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<McpCreateTableResponse> {
    const data = await response.json();
    return McpCreateTableResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      displayname: this.displayname,
      item: this.item,
      tablename: this.tablename,
      description: this.description,
    };
  }
}

/**
 * McpCreateTable response message
 */
export class McpCreateTableResponse extends OrganizationResponse {
  constructor(public result: McpCreateTableResponse) {
    super("McpCreateTable");
  }

  static fromResponse(data: unknown): McpCreateTableResponse {
    return new McpCreateTableResponse((data as any).value);
  }
}
