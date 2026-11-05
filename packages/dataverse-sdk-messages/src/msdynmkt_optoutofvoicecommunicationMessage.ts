import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_optoutofvoicecommunication request message
 *
 * Web API Action: msdynmkt_optoutofvoicecommunication
 */
export class msdynmkt_optoutofvoicecommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofvoicecommunicationResponse>
{
  constructor(public msdynmkt_trackingcontextid: string) {
    super("msdynmkt_optoutofvoicecommunication");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofvoicecommunication`;

    const body: Record<string, unknown> = {
      msdynmkt_trackingcontextid: this.msdynmkt_trackingcontextid,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofvoicecommunicationResponse> {
    // No return value (204 No Content)
    return new msdynmkt_optoutofvoicecommunicationResponse();
  }
}

/**
 * msdynmkt_optoutofvoicecommunication response message
 */
export class msdynmkt_optoutofvoicecommunicationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_optoutofvoicecommunication");
  }

  static fromResponse(_data: unknown): msdynmkt_optoutofvoicecommunicationResponse {
    return new msdynmkt_optoutofvoicecommunicationResponse();
  }
}
