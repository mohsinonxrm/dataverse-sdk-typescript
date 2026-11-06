import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { searchsuggestResponse as searchsuggestResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return searchsuggestResponse.fromResponse({});
    return searchsuggestResponse.fromResponse(await response.json());
  }
}

/**
 * searchsuggest response message
 */
export class searchsuggestResponse extends OrganizationResponse {
  constructor(public result: searchsuggestResponseData) {
    super("searchsuggest");
  }

  static fromResponse(data: unknown): searchsuggestResponse {
    return new searchsuggestResponse(responseObject<searchsuggestResponseData>(data));
  }
}
