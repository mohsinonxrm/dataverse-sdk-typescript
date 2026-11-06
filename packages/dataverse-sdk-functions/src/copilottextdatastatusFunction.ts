import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from copilottextdatastatus function
 */
export interface copilottextdatastatusResponse {
  response: string;
}

/**
 * copilottextdatastatus function
 *
 * Unbound function
 */
export class copilottextdatastatusFunction implements Executable<copilottextdatastatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/copilottextdatastatus`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<copilottextdatastatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as copilottextdatastatusResponse;
  }
}
