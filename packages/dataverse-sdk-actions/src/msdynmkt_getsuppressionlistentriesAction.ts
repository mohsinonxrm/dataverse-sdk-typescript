import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_getsuppressionlistentries action
 */
export interface msdynmkt_getsuppressionlistentriesResponse {
  msdynmkt_getsuppressionlistentriesresponse: string;
}

/**
 * msdynmkt_getsuppressionlistentries action
 *
 * Unbound action
 */
export class msdynmkt_getsuppressionlistentriesAction implements Executable<msdynmkt_getsuppressionlistentriesResponse> {
  constructor(public readonly msdynmkt_getsuppressionlistentriesemailaddresses: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentries`;

    const body: Record<string, unknown> = {
      msdynmkt_getsuppressionlistentriesemailaddresses:
        this.msdynmkt_getsuppressionlistentriesemailaddresses,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentriesResponse> {
    const data = await response.json();
    return data as msdynmkt_getsuppressionlistentriesResponse;
  }
}
