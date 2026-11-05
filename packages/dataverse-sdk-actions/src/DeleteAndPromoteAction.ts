import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteAndPromote action
 */
export interface DeleteAndPromoteResponse {
  SolutionId: string;
}

/**
 * DeleteAndPromote action
 *
 * Unbound action
 */
export class DeleteAndPromoteAction implements Executable<DeleteAndPromoteResponse> {
  constructor(public readonly uniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromote`;

    const body: Record<string, unknown> = {
      UniqueName: this.uniqueName,
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

  async parseResponse(response: Response): Promise<DeleteAndPromoteResponse> {
    const data = await response.json();
    return data as DeleteAndPromoteResponse;
  }
}
