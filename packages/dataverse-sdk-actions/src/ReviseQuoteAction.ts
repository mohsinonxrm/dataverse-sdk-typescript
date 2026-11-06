import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet, quote } from "./types/index.js";

/**
 * Response from ReviseQuote action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ReviseQuoteResponse extends quote {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the ReviseQuote action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReviseQuoteActionParameters {
  QuoteId: string;
  ColumnSet?: ColumnSet;
}

/**
 * ReviseQuote action
 *
 * Unbound action
 */
export class ReviseQuoteAction implements Executable<ReviseQuoteResponse> {
  constructor(public readonly parameters: ReviseQuoteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReviseQuote`;

    const body = requestBody({
      QuoteId: this.parameters.QuoteId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
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

  async parseResponse(response: Response): Promise<ReviseQuoteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ReviseQuoteResponse;
    return (await response.json()) as ReviseQuoteResponse;
  }
}
