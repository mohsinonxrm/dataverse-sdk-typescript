import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the searchquery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchqueryResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the searchquery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchqueryActionParameters {
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
      orderby: this.parameters.orderby,
      facets: this.parameters.facets,
      entities: this.parameters.entities,
      filter: this.parameters.filter,
      top: this.parameters.top,
      search: this.parameters.search,
      count: this.parameters.count,
      propertybag: this.parameters.propertybag,
      skip: this.parameters.skip,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as searchqueryResponse;
  }
}
