import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { searchqueryResponse as searchqueryResponseData } from "./types/index.js";

/**
 * Parameters of the searchquery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchqueryRequestParameters {
  options?: string;
  filter?: string;
  propertybag?: string;
  entities?: string;
  search: string;
  facets?: string;
  skip?: number;
  count?: boolean;
  top?: number;
  orderby?: string;
  semanticquery?: string;
}

/**
 * searchquery request message
 *
 * Web API Action: searchquery
 */
export class searchqueryRequest
  extends OrganizationRequest
  implements Executable<searchqueryResponse>
{
  declare readonly Parameters: Readonly<searchqueryRequestParameters>;

  constructor(parameters: searchqueryRequestParameters) {
    super("searchquery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchquery`;

    const body = requestBody({
      options: this.Parameters.options,
      filter: this.Parameters.filter,
      propertybag: this.Parameters.propertybag,
      entities: this.Parameters.entities,
      search: this.Parameters.search,
      facets: this.Parameters.facets,
      skip: this.Parameters.skip,
      count: this.Parameters.count,
      top: this.Parameters.top,
      orderby: this.Parameters.orderby,
      semanticquery: this.Parameters.semanticquery,
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

  async parseResponse(response: Response): Promise<searchqueryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return searchqueryResponse.fromResponse({});
    return searchqueryResponse.fromResponse(await response.json());
  }
}

/**
 * searchquery response message
 */
export class searchqueryResponse extends OrganizationResponse {
  constructor(public result: searchqueryResponseData) {
    super("searchquery");
  }

  static fromResponse(data: unknown): searchqueryResponse {
    return new searchqueryResponse(responseObject<searchqueryResponseData>(data));
  }
}
