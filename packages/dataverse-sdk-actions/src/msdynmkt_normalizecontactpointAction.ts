import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_normalizecontactpoint action
 */
export interface msdynmkt_normalizecontactpointResponse {
  msdynmkt_normalizedcontactpointvalue: string;
}

/**
 * msdynmkt_normalizecontactpoint action
 *
 * Unbound action
 */
export class msdynmkt_normalizecontactpointAction implements Executable<msdynmkt_normalizecontactpointResponse> {
  constructor(
    public readonly msdynmkt_contactpointvalue: string,
    public readonly msdynmkt_contactpointtype: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_normalizecontactpoint`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.msdynmkt_contactpointtype,
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

  async parseResponse(response: Response): Promise<msdynmkt_normalizecontactpointResponse> {
    const data = await response.json();
    return data as msdynmkt_normalizecontactpointResponse;
  }
}
