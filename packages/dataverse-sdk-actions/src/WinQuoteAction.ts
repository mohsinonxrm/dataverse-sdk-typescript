import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Response from WinQuote action
 */
export interface WinQuoteResponse {
  // No content returned
}

/**
 * Parameters of the WinQuote action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface WinQuoteActionParameters {
  QuoteClose: EntityReference | EntityPayload<quoteclose>;
  Status: number;
}

/**
 * WinQuote action
 *
 * Unbound action
 */
export class WinQuoteAction implements Executable<WinQuoteResponse> {
  constructor(public readonly parameters: WinQuoteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinQuote`;

    const body = requestBody({
      QuoteClose: this.parameters.QuoteClose,
      Status: this.parameters.Status,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as WinQuoteResponse;
    return (await response.json()) as WinQuoteResponse;
  }
}
