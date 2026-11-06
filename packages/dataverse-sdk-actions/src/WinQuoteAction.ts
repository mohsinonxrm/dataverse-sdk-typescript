import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { quoteclose } from "./types/index.js";

/**
 * Response from the WinQuote action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type WinQuoteResponse = void;

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

  parseResponse(_response: Response): Promise<WinQuoteResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
