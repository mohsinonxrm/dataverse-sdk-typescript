import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from McpUpdateTable action
 */
export interface McpUpdateTableResponse {
  successMessage: string;
}

/**
 * McpUpdateTable action
 *
 * Unbound action
 */
export class McpUpdateTableAction implements Executable<McpUpdateTableResponse> {
  constructor(
    public readonly newDisplayName: string | undefined,
    public readonly tablename: string,
    public readonly item: string,
    public readonly description?: string
  ) {}

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
    return data as McpUpdateTableResponse;
  }
}
