import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the copilottextdatastatus function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface copilottextdatastatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as copilottextdatastatusResponse;
  }
}
