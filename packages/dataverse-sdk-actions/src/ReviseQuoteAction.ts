import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet, quote } from "./types/index.js";

/**
 * Response from the ReviseQuote action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ReviseQuoteResponse =
  (quote & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ReviseQuoteResponse;
  }
}
