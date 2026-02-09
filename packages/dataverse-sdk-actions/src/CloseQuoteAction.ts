import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { quoteclose } from "./types/index.js";

/**
 * Response from CloseQuote action
 */
export interface CloseQuoteResponse {
  // No content returned
}

/**
 * CloseQuote action
 *
 * Unbound action
 */
export class CloseQuoteAction implements Executable<CloseQuoteResponse> {
  constructor(
    public readonly quoteClose: quoteclose,
    public readonly status: number
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloseQuoteResponse> {
    // No return value (204 No Content)
    return {};
  }
}
