import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteAndPromoteAsync action
 */
export interface DeleteAndPromoteAsyncResponse {
  AsyncOperationId: string;
}

/**
 * DeleteAndPromoteAsync action
 *
 * Unbound action
 */
export class DeleteAndPromoteAsyncAction implements Executable<DeleteAndPromoteAsyncResponse> {
  constructor(public readonly uniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromoteAsync`;

    const body: Record<string, unknown> = {
      UniqueName: this.uniqueName,
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

  async parseResponse(response: Response): Promise<DeleteAndPromoteAsyncResponse> {
    const data = await response.json();
    return data as DeleteAndPromoteAsyncResponse;
  }
}
