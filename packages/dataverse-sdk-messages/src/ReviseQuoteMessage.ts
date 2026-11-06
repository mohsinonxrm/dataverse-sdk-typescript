import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return ReviseQuoteResponse.fromResponse({});
    return ReviseQuoteResponse.fromResponse(await response.json());
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
    return new ReviseQuoteResponse(responseObject<quote>(data));
  }
}
