import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_optoutofallvoicecommunication action
 */
export interface msdynmkt_optoutofallvoicecommunicationResponse {
  // No content returned
}

/**
 * msdynmkt_optoutofallvoicecommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofallvoicecommunicationAction implements Executable<msdynmkt_optoutofallvoicecommunicationResponse> {
  constructor(
    public readonly msdynmkt_contactpointvalue: string,
    public readonly msdynmkt_correlationid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofallvoicecommunication`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_correlationid: this.msdynmkt_correlationid,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofallvoicecommunicationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
