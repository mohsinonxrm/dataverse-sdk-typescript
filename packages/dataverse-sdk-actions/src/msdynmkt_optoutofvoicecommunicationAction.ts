import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_optoutofvoicecommunication action
 */
export interface msdynmkt_optoutofvoicecommunicationResponse {
  // No content returned
}

/**
 * msdynmkt_optoutofvoicecommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofvoicecommunicationAction implements Executable<msdynmkt_optoutofvoicecommunicationResponse> {
  constructor(public readonly msdynmkt_trackingcontextid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofvoicecommunication`;

    const body: Record<string, unknown> = {
      msdynmkt_trackingcontextid: this.msdynmkt_trackingcontextid,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofvoicecommunicationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
