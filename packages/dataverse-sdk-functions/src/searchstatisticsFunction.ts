import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from searchstatistics function
 */
export interface searchstatisticsResponse {
  response: string;
}

/**
 * searchstatistics function
 *
 * Unbound function
 */
export class searchstatisticsFunction implements Executable<searchstatisticsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatistics`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatisticsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as searchstatisticsResponse;
    return (await response.json()) as searchstatisticsResponse;
  }
}
