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
  orderby?: string;
  facets?: string;
  entities?: string;
  filter?: string;
  top?: number;
  search: string;
  count?: boolean;
  propertybag?: string;
  skip?: number;
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
      orderby: this.Parameters.orderby,
      facets: this.Parameters.facets,
      entities: this.Parameters.entities,
      filter: this.Parameters.filter,
      top: this.Parameters.top,
      search: this.Parameters.search,
      count: this.Parameters.count,
      propertybag: this.Parameters.propertybag,
      skip: this.Parameters.skip,
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
