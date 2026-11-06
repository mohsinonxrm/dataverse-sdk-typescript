import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveVersion function
 */
export interface RetrieveVersionResponse {
  Version: string;
}

/**
 * RetrieveVersion function
 *
 * Unbound function
 */
export class RetrieveVersionFunction implements Executable<RetrieveVersionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveVersion`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveVersionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveVersionResponse;
  }
}
