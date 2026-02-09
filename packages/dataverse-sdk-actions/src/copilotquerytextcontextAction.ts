import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from copilotquerytextcontext action
 */
export interface copilotquerytextcontextResponse {
  response: string;
}

/**
 * copilotquerytextcontext action
 *
 * Unbound action
 */
export class copilotquerytextcontextAction implements Executable<copilotquerytextcontextResponse> {
  constructor(
    public readonly totalResultCount: boolean,
    public readonly orderBy: string,
    public readonly searchMode: string,
    public readonly entityParameters: string,
    public readonly skip: number,
    public readonly top: number,
    public readonly options: string,
    public readonly searchType: string,
    public readonly searchText: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/copilotquerytextcontext`;

    const body: Record<string, unknown> = {
      totalResultCount: this.totalResultCount,
      orderBy: this.orderBy,
      searchMode: this.searchMode,
      entityParameters: this.entityParameters,
      skip: this.skip,
      top: this.top,
      options: this.options,
      searchType: this.searchType,
      searchText: this.searchText,
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

  async parseResponse(response: Response): Promise<copilotquerytextcontextResponse> {
    const data = await response.json();
    return data as copilotquerytextcontextResponse;
  }
}
