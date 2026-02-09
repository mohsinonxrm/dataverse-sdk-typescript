import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { quoteclose } from "./types/index.js";

/**
 * WinQuote request message
 *
 * Web API Action: WinQuote
 */
export class WinQuoteRequest extends OrganizationRequest implements Executable<WinQuoteResponse> {
  constructor(
    public quoteClose: quoteclose,
    public status: number
  ) {
    super("WinQuote");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinQuote`;

    const body: Record<string, unknown> = {
      QuoteClose: this.quoteClose,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<WinQuoteResponse> {
    // No return value (204 No Content)
    return new WinQuoteResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QuoteClose: this.quoteClose,
      Status: this.status,
    };
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
