import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { quoteclose } from "./types/index.js";

/**
 * CloseQuote request message
 *
 * Web API Action: CloseQuote
 */
export class CloseQuoteRequest
  extends OrganizationRequest
  implements Executable<CloseQuoteResponse>
{
  constructor(
    public quoteClose: quoteclose,
    public status: number
  ) {
    super("CloseQuote");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseQuote`;

    const body: Record<string, unknown> = {
      QuoteClose: this.quoteClose,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<CloseQuoteResponse> {
    // No return value (204 No Content)
    return new CloseQuoteResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QuoteClose: this.quoteClose,
      Status: this.status,
    };
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
