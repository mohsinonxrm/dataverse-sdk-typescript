import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the searchsuggest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchsuggestRequestParameters {
  top?: number;
  orderby?: string;
  options?: string;
  search: string;
  filter?: string;
  propertybag?: string;
  fuzzy?: boolean;
  entities?: string;
}

/**
 * searchsuggest request message
 *
 * Web API Action: searchsuggest
 */
export class searchsuggestRequest
  extends OrganizationRequest
  implements Executable<searchsuggestResponse>
{
  declare readonly Parameters: Readonly<searchsuggestRequestParameters>;

  constructor(parameters: searchsuggestRequestParameters) {
    super("searchsuggest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchsuggest`;

    const body = requestBody({
      top: this.Parameters.top,
      orderby: this.Parameters.orderby,
      options: this.Parameters.options,
      search: this.Parameters.search,
      filter: this.Parameters.filter,
      propertybag: this.Parameters.propertybag,
      fuzzy: this.Parameters.fuzzy,
      entities: this.Parameters.entities,
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

  async parseResponse(response: Response): Promise<searchsuggestResponse> {
    // The body is the complex value, with its @odata.context
    return searchsuggestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the searchsuggest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchsuggestResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchsuggest response message
 *
 * `result` is the value the searchsuggest action returns (see {@link searchsuggestResult}).
 */
export class searchsuggestResponse extends OrganizationResponse {
  constructor(public result: searchsuggestResult) {
    super("searchsuggest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): searchsuggestResponse {
    return new searchsuggestResponse(data as searchsuggestResult);
  }
}
