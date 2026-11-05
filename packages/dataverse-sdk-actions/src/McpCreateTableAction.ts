import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from McpCreateTable action
 */
export interface McpCreateTableResponse {
  successMessage: string;
}

/**
 * McpCreateTable action
 *
 * Unbound action
 */
export class McpCreateTableAction implements Executable<McpCreateTableResponse> {
  constructor(
    public readonly displayname: string,
    public readonly item: string,
    public readonly tablename: string,
    public readonly description: string
  ) {}

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
    return data as McpCreateTableResponse;
  }
}
