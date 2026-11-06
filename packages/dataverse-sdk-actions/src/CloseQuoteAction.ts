import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Response from the CloseQuote action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CloseQuoteResponse = void;

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

  parseResponse(_response: Response): Promise<CloseQuoteResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
