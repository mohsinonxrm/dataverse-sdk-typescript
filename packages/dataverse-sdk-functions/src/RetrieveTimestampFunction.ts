import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveTimestamp function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTimestampResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveTimestampResponse;
  }
}
