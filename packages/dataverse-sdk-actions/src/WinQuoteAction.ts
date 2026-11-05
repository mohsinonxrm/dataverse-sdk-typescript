import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { quoteclose } from "./types/index.js";

/**
 * Response from WinQuote action
 */
export interface WinQuoteResponse {
  // No content returned
}

/**
 * WinQuote action
 *
 * Unbound action
 */
export class WinQuoteAction implements Executable<WinQuoteResponse> {
  constructor(
    public readonly quoteClose: quoteclose,
    public readonly status: number
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<WinQuoteResponse> {
    // No return value (204 No Content)
    return {};
  }
}
