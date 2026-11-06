import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_optoutofvoicecommunication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofvoicecommunicationRequestParameters {
  msdynmkt_trackingcontextid: string;
}

/**
 * msdynmkt_optoutofvoicecommunication request message
 *
 * Web API Action: msdynmkt_optoutofvoicecommunication
 */
export class msdynmkt_optoutofvoicecommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofvoicecommunicationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_optoutofvoicecommunicationRequestParameters>;

  constructor(parameters: msdynmkt_optoutofvoicecommunicationRequestParameters) {
    super("msdynmkt_optoutofvoicecommunication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofvoicecommunication`;

    const body = requestBody({
      msdynmkt_trackingcontextid: this.Parameters.msdynmkt_trackingcontextid,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<msdynmkt_optoutofvoicecommunicationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_optoutofvoicecommunicationResponse());
  }
}

/**
 * msdynmkt_optoutofvoicecommunication response message
 */
export class msdynmkt_optoutofvoicecommunicationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_optoutofvoicecommunication");
  }

  static fromResponse(_data?: unknown): msdynmkt_optoutofvoicecommunicationResponse {
    return new msdynmkt_optoutofvoicecommunicationResponse();
  }
}
