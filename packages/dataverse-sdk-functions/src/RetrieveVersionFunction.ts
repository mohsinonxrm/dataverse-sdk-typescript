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
    const data = await response.json();
    return data as RetrieveVersionResponse;
  }
}
