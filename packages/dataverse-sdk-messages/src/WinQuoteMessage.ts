import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Parameters of the WinQuote message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface WinQuoteRequestParameters {
  QuoteClose: EntityReference | EntityPayload<quoteclose>;
  Status: number;
}

/**
 * WinQuote request message
 *
 * Web API Action: WinQuote
 */
export class WinQuoteRequest extends OrganizationRequest implements Executable<WinQuoteResponse> {
  declare readonly Parameters: Readonly<WinQuoteRequestParameters>;

  constructor(parameters: WinQuoteRequestParameters) {
    super("WinQuote", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinQuote`;

    const body = requestBody({
      QuoteClose: this.Parameters.QuoteClose,
      Status: this.Parameters.Status,
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

  async parseResponse(response: Response): Promise<WinQuoteResponse> {
    // No return value (204 No Content)
    return new WinQuoteResponse();
  }
}

/**
 * WinQuote response message
 */
export class WinQuoteResponse extends OrganizationResponse {
  constructor() {
    super("WinQuote");
  }

  static fromResponse(_data: unknown): WinQuoteResponse {
    return new WinQuoteResponse();
  }
}
