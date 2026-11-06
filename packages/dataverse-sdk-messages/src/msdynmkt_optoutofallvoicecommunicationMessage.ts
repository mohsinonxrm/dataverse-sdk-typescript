import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_optoutofallvoicecommunication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofallvoicecommunicationRequestParameters {
  msdynmkt_contactpointvalue: string;
  msdynmkt_correlationid?: string;
}

/**
 * msdynmkt_optoutofallvoicecommunication request message
 *
 * Web API Action: msdynmkt_optoutofallvoicecommunication
 */
export class msdynmkt_optoutofallvoicecommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofallvoicecommunicationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_optoutofallvoicecommunicationRequestParameters>;

  constructor(parameters: msdynmkt_optoutofallvoicecommunicationRequestParameters) {
    super("msdynmkt_optoutofallvoicecommunication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofallvoicecommunication`;

    const body = requestBody({
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
      msdynmkt_correlationid: this.Parameters.msdynmkt_correlationid,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofallvoicecommunicationResponse> {
    // No return value (204 No Content)
    return new msdynmkt_optoutofallvoicecommunicationResponse();
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
