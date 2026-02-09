import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from searchstatus function
 */
export interface searchstatusResponse {
  response: string;
}

/**
 * searchstatus function
 *
 * Unbound function
 */
export class searchstatusFunction implements Executable<searchstatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatus`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatusResponse> {
    const data = await response.json();
    return data as searchstatusResponse;
  }
}
