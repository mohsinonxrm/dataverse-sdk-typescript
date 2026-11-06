import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveTimestamp function
 */
export interface RetrieveTimestampResponse {
  Timestamp: string;
}

/**
 * RetrieveTimestamp function
 *
 * Unbound function
 */
export class RetrieveTimestampFunction implements Executable<RetrieveTimestampResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveTimestamp`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTimestampResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveTimestampResponse;
    return (await response.json()) as RetrieveTimestampResponse;
  }
}
