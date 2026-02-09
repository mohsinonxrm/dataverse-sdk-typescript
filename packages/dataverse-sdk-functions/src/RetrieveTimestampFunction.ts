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
    const data = await response.json();
    return data as RetrieveTimestampResponse;
  }
}
