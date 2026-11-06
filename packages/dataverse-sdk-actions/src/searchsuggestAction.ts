import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from searchsuggest action
 */
export interface searchsuggestResponse {
  response: string;
}

/**
 * Parameters of the searchsuggest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface searchsuggestActionParameters {
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
 * searchsuggest action
 *
 * Unbound action
 */
export class searchsuggestAction implements Executable<searchsuggestResponse> {
  constructor(public readonly parameters: searchsuggestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchsuggest`;

    const body = requestBody({
      top: this.parameters.top,
      orderby: this.parameters.orderby,
      options: this.parameters.options,
      search: this.parameters.search,
      filter: this.parameters.filter,
      propertybag: this.parameters.propertybag,
      fuzzy: this.parameters.fuzzy,
      entities: this.parameters.entities,
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
    if (response.status === 204) return {} as searchsuggestResponse;
    return (await response.json()) as searchsuggestResponse;
  }
}
