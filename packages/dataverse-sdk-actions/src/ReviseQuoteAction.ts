import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
 * ReviseQuote action
 *
 * Unbound action
 */
export class ReviseQuoteAction implements Executable<ReviseQuoteResponse> {
  constructor(
    public readonly quoteId: string,
    public readonly columnSet?: ColumnSet
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReviseQuote`;

    const body: Record<string, unknown> = {
      QuoteId: this.quoteId,
      ColumnSet: enumBody(this.columnSet, "ColumnSet"),
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

  async parseResponse(response: Response): Promise<ReviseQuoteResponse> {
    const data = await response.json();
    return data as ReviseQuoteResponse;
  }
}
