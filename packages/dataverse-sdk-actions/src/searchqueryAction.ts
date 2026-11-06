import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from searchquery action
 */
export interface searchqueryResponse {
  response: string;
}

/**
 * Parameters of the searchquery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchqueryActionParameters {
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
 * searchquery action
 *
 * Unbound action
 */
export class searchqueryAction implements Executable<searchqueryResponse> {
  constructor(public readonly parameters: searchqueryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchquery`;

    const body = requestBody({
      options: this.parameters.options,
      filter: this.parameters.filter,
      propertybag: this.parameters.propertybag,
      entities: this.parameters.entities,
      search: this.parameters.search,
      facets: this.parameters.facets,
      skip: this.parameters.skip,
      count: this.parameters.count,
      top: this.parameters.top,
      orderby: this.parameters.orderby,
      semanticquery: this.parameters.semanticquery,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as searchqueryResponse;
  }
}
