import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_getsuppressionlistentry action
 */
export interface msdynmkt_getsuppressionlistentryResponse {
  msdynmkt_getsuppressionlistentryresponse: string;
}

/**
 * msdynmkt_getsuppressionlistentry action
 *
 * Unbound action
 */
export class msdynmkt_getsuppressionlistentryAction implements Executable<msdynmkt_getsuppressionlistentryResponse> {
  constructor(public readonly msdynmkt_emailaddress: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentry`;

    const body: Record<string, unknown> = {
      msdynmkt_emailaddress: this.msdynmkt_emailaddress,
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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentryResponse> {
    const data = await response.json();
    return data as msdynmkt_getsuppressionlistentryResponse;
  }
}
