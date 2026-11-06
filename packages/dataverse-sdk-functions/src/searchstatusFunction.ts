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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as searchstatusResponse;
    return (await response.json()) as searchstatusResponse;
  }
}
