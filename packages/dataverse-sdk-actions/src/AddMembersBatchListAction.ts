import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddMembersBatchList action
 */
export interface AddMembersBatchListResponse {
  SkipCountAfter: number;
}

/**
 * AddMembersBatchList action
 *
 * Unbound action
 */
export class AddMembersBatchListAction implements Executable<AddMembersBatchListResponse> {
  constructor(
    public readonly listId: string,
    public readonly fetchXml: string,
    public readonly skipCount: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddMembersBatchList`;

    const body: Record<string, unknown> = {
      ListId: this.listId,
      FetchXml: this.fetchXml,
      SkipCount: this.skipCount,
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

  async parseResponse(response: Response): Promise<AddMembersBatchListResponse> {
    const data = await response.json();
    return data as AddMembersBatchListResponse;
  }
}
