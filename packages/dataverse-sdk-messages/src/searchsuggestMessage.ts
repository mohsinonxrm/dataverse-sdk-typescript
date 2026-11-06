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
  entities?: string;
  top?: number;
  search: string;
  filter?: string;
  options?: string;
  orderby?: string;
  fuzzy?: boolean;
  propertybag?: string;
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
      entities: this.Parameters.entities,
      top: this.Parameters.top,
      search: this.Parameters.search,
      filter: this.Parameters.filter,
      options: this.Parameters.options,
      orderby: this.Parameters.orderby,
      fuzzy: this.Parameters.fuzzy,
      propertybag: this.Parameters.propertybag,
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
