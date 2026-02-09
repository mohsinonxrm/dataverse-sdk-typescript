import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_optoutofallvoicecommunication request message
 *
 * Web API Action: msdynmkt_optoutofallvoicecommunication
 */
export class msdynmkt_optoutofallvoicecommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofallvoicecommunicationResponse>
{
  constructor(
    public msdynmkt_contactpointvalue: string,
    public msdynmkt_correlationid: string
  ) {
    super("msdynmkt_optoutofallvoicecommunication");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_optoutofallvoicecommunicationResponse> {
    // No return value (204 No Content)
    return new msdynmkt_optoutofallvoicecommunicationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_correlationid: this.msdynmkt_correlationid,
    };
  }
}

/**
 * msdynmkt_optoutofallvoicecommunication response message
 */
export class msdynmkt_optoutofallvoicecommunicationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_optoutofallvoicecommunication");
  }

  static fromResponse(_data: unknown): msdynmkt_optoutofallvoicecommunicationResponse {
    return new msdynmkt_optoutofallvoicecommunicationResponse();
  }
}
