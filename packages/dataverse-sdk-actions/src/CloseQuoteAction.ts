import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Response from CloseQuote action
 */
export interface CloseQuoteResponse {
  // No content returned
}

/**
 * Parameters of the CloseQuote action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloseQuoteActionParameters {
  QuoteClose: EntityReference | EntityPayload<quoteclose>;
  Status: number;
}

/**
 * CloseQuote action
 *
 * Unbound action
 */
export class CloseQuoteAction implements Executable<CloseQuoteResponse> {
  constructor(public readonly parameters: CloseQuoteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseQuote`;

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

  async parseResponse(response: Response): Promise<CloseQuoteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloseQuoteResponse;
    return (await response.json()) as CloseQuoteResponse;
  }
}
