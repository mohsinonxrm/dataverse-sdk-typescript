import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from EmptyRecycleBin action
 */
export interface EmptyRecycleBinResponse {
  DeletedCount: number;
}

/**
 * EmptyRecycleBin action
 *
 * Unbound action
 */
export class EmptyRecycleBinAction implements Executable<EmptyRecycleBinResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/EmptyRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<EmptyRecycleBinResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as EmptyRecycleBinResponse;
    return (await response.json()) as EmptyRecycleBinResponse;
  }
}
