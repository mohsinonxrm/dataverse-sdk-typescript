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
 * searchsuggest action
 *
 * Unbound action
 */
export class searchsuggestAction implements Executable<searchsuggestResponse> {
  constructor(public readonly parameters: searchsuggestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/searchsuggest`;

    const body = requestBody({
      entities: this.parameters.entities,
      top: this.parameters.top,
      search: this.parameters.search,
      filter: this.parameters.filter,
      options: this.parameters.options,
      orderby: this.parameters.orderby,
      fuzzy: this.parameters.fuzzy,
      propertybag: this.parameters.propertybag,
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
