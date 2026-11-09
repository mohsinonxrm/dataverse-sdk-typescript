import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet, quote } from "./types/index.js";

/**
 * Parameters of the ReviseQuote message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReviseQuoteRequestParameters {
  QuoteId: string;
  ColumnSet?: ColumnSet;
}

/**
 * ReviseQuote request message
 *
 * Web API Action: ReviseQuote
 */
export class ReviseQuoteRequest
  extends OrganizationRequest
  implements Executable<ReviseQuoteResponse>
{
  declare readonly Parameters: Readonly<ReviseQuoteRequestParameters>;

  constructor(parameters: ReviseQuoteRequestParameters) {
    super("ReviseQuote", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReviseQuote`;

    const body = requestBody({
      QuoteId: this.Parameters.QuoteId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
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
    if (response.status === 204) return ReviseQuoteResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ReviseQuoteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ReviseQuote action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ReviseQuoteResult =
  (quote & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * ReviseQuote response message
 *
 * `result` is the value the ReviseQuote action returns (see {@link ReviseQuoteResult}).
 */
export class ReviseQuoteResponse extends OrganizationResponse {
  constructor(public result: ReviseQuoteResult) {
    super("ReviseQuote");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ReviseQuoteResponse {
    return new ReviseQuoteResponse((data ?? null) as ReviseQuoteResult);
  }
}
