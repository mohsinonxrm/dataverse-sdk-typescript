import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_removesuppressionlistentry action
 */
export interface msdynmkt_removesuppressionlistentryResponse {
  msdynmkt_removesuppressionlistentryresponse: string;
}

/**
 * msdynmkt_removesuppressionlistentry action
 *
 * Unbound action
 */
export class msdynmkt_removesuppressionlistentryAction implements Executable<msdynmkt_removesuppressionlistentryResponse> {
  constructor(public readonly msdynmkt_emailaddress: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_removesuppressionlistentry`;

    const body: Record<string, unknown> = {
      msdynmkt_emailaddress: this.msdynmkt_emailaddress,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    const data = await response.json();
    return data as msdynmkt_removesuppressionlistentryResponse;
  }
}
