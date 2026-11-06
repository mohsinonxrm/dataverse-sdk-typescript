import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Parameters of the CloseQuote message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloseQuoteRequestParameters {
  QuoteClose: EntityReference | EntityPayload<quoteclose>;
  Status: number;
}

/**
 * CloseQuote request message
 *
 * Web API Action: CloseQuote
 */
export class CloseQuoteRequest
  extends OrganizationRequest
  implements Executable<CloseQuoteResponse>
{
  declare readonly Parameters: Readonly<CloseQuoteRequestParameters>;

  constructor(parameters: CloseQuoteRequestParameters) {
    super("CloseQuote", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseQuote`;

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

  async parseResponse(response: Response): Promise<CloseQuoteResponse> {
    // No return value (204 No Content)
    return new CloseQuoteResponse();
  }
}

/**
 * CloseQuote response message
 */
export class CloseQuoteResponse extends OrganizationResponse {
  constructor() {
    super("CloseQuote");
  }

  static fromResponse(_data: unknown): CloseQuoteResponse {
    return new CloseQuoteResponse();
  }
}
