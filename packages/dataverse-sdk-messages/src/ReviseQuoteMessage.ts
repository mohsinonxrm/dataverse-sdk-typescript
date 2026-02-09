import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ColumnSet, quote } from "./types/index.js";

/**
 * ReviseQuote request message
 *
 * Web API Action: ReviseQuote
 */
export class ReviseQuoteRequest
  extends OrganizationRequest
  implements Executable<ReviseQuoteResponse>
{
  constructor(
    public quoteId: string,
    public columnSet: ColumnSet
  ) {
    super("ReviseQuote");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReviseQuote`;

    const body: Record<string, unknown> = {
      QuoteId: this.quoteId,
      ColumnSet: this.columnSet,
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

  async parseResponse(response: Response): Promise<ReviseQuoteResponse> {
    const data = await response.json();
    return ReviseQuoteResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QuoteId: this.quoteId,
      ColumnSet: this.columnSet,
    };
  }
}

/**
 * ReviseQuote response message
 */
export class ReviseQuoteResponse extends OrganizationResponse {
  constructor(public result: quote) {
    super("ReviseQuote");
  }

  static fromResponse(data: unknown): ReviseQuoteResponse {
    return new ReviseQuoteResponse((data as any).value);
  }
}
