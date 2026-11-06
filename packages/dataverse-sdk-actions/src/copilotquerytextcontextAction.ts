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
    public readonly totalResultCount: boolean | undefined,
    public readonly orderBy: string | undefined,
    public readonly searchMode: string | undefined,
    public readonly entityParameters: string | undefined,
    public readonly skip: number | undefined,
    public readonly top: number | undefined,
    public readonly options: string | undefined,
    public readonly searchType: string | undefined,
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<copilotquerytextcontextResponse> {
    const data = await response.json();
    return data as copilotquerytextcontextResponse;
  }
}
